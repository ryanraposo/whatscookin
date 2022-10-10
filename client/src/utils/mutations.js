import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($postTitle: String!, $postBody: String!, $categories: [ID]!) { 
    addPost(postTitle: $postTitle, postBody: $postBody, categories: $categories) {
      _id
      postTitle
      postBody
      categories {
        _id
        name
      }
      createdAt
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      postTitle
      postBody
      categories {
        _id
        name
      }
      createdAt
      username
      comments {
        _id
        commentBody
        createdAt
        username
      }
      commentsCount
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $username: String, $password: String) {
    updateUser(email: $email, username: $username, password: $password) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $postTitle: String, $postBody: String, $categories: [ID]) {
    updatePost(_id: $id, postTitle: $postTitle, postBody: $postBody, categories: $categories) {
      _id
      postTitle
      postBody
      categories {
        _id
        name
      }
      createdAt
      username
      comments {
        _id
        commentBody
        createdAt
        username
      }
      commentsCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(_id: $id) {
      _id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!, $postId: ID!) {
    deleteComment(_id: $id, postId: $postId) {
      _id
      postTitle
      postBody
      categories {
        _id
        name
      }
      createdAt
      username
      comments {
        _id
        commentBody
        createdAt
        username
      }
      commentsCount
    }
  }
`;