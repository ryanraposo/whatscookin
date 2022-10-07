import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($postTitle: String!, $postText: String!, $author: ID!, $image: String, $categories: [ID!]) {
    addPost(postTitle: $postTitle, postText: $postText, author: $author, image: $image, categories: $categories) {
      _id
      author {
        _id
        username
      }
      categories {
        _id
        name
      }
      createdAt
      image
      postText
      postTitle
    }
  }
`;