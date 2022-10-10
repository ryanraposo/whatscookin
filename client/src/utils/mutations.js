import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
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
  mutation addPost($postTitle: String!, $postText: String!, $image: String, $categories: [String!]!) {
    addPost(postTitle: $postTitle, postText: $postText, image: $image, categories: $categories) {
      _id
      postTitle
      postText
      image
      categories
      createdAt
      username
    }
  }
`;