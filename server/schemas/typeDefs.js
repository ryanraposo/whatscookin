const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        posts: [Post]
    }

    type Post {
        _id: ID
        postTitle: String
        postText: String
        image: String
        categories:[Category]
        createdAt: String
        author: User
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
        posts(categories: [ID], postTitle: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postTitle: String!, postText: String!, image: String, categories: [ID!], author: ID!): Post
        updateUser(username: String, email: String, password: String): User
        updatePost(postTitle: String, postText: String, image: String, categories: [ID]): Post
        login(email: String!, password: String): Auth
        deletePost(_id: ID!): Post
    }
`;

module.exports = typeDefs;