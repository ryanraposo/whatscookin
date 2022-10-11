const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        posts: [Post]
    }

    type Comment {
        _id: ID
        commentBody: String
        createdAt: String
        username: String
    }

    type Post {
        _id: ID
        postTitle: String
        postBody: String
        categories:[Category]
        createdAt: String
        username: String
        comments: [Comment]
        commentsCount: Int
    }

    type Category {
        _id: ID
        name: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        me: User
        user(_id: ID!): User
        posts(categories: [ID], username: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postTitle: String!, postBody: String!, categories: [ID]!): Post
        addComment(postId: ID!, commentBody: String!): Post
        updateUser(username: String, email: String, password: String): User
        updatePost(_id: ID!, postTitle: String, postBody: String, categories: [ID]): Post
        login(email: String!, password: String!): Auth
        deletePost(_id: ID!): Post
        deleteComment(_id: ID!, postId: ID!): Post
    }
`;

module.exports = typeDefs;