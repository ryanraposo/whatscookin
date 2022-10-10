const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const me = await User.findById(context.user._id)
                    .select('-__v -password')
                    .populate({
                        path: 'posts',
                        populate: 'categories'
                    });
                return me;
            }
            throw new AuthenticationError('Not logged in');
        },
        user: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(_id)
                    .select('-__v -password')
                    .populate({
                        path: 'posts',
                        populate: 'categories'
                    });
                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
        posts: async (parent, { category, username }) => {
            const params = {};
            if (category) {
                params.category = category;
            }

            if (username) {
                params.username = username;
            }

            return await Post.find(params).populate('username').populate('categories');
        },
        post: async (parent, { _id }) => {
            return await Post.findById(_id).populate('username').populate('categories');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await (await Post.create({ ...args, username: context.user.username })).populate('categories');

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('Not logged in!');
        },
        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
                return await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                ).populate('categories')
            }
            throw new AuthenticationError('Not logged in!');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        updatePost: async (parent, args, context) => {
            if (context.user) {
                const { _id, ...updateContent } = args;
                const post = await Post.findById(_id);

                if (post.username === context.user.username) {
                    return await Post.findByIdAndUpdate(_id, updateContent, { new: true });
                };

                throw new AuthenticationError('You are not authorized to edit this post');
            }

            throw new AuthenticationError('Not logged in!')
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },
        deletePost: async (parent, { _id }, context) => {
            if (context.user) {
                await Post.findByIdAndDelete(_id);
                return await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: _id } },
                    { new: true }
                ).populate("posts");
            }
            throw new AuthenticationError('Not logged in!');
        },
        deleteComment: async (parent, {_id, postId}, context) => {
            if (context.user) {
                return await Post.findByIdAndUpdate(
                    { _id: postId },
                    { $pull: { comments: { _id: _id } } },
                    { new: true }
                ).populate("categories");
            }
            throw new AuthenticationError('Not logged in!');
        }
    }
};

module.exports = resolvers;