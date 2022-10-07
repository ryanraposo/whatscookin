import { gql } from '@apollo/client';


export const QUERY_POSTS = gql`
    query posts($username: String) {
        posts(username: $username) {
            _id
            postTitle
            postText
            image
            categories
            createdAt
            author
        }
    }
`;

export const QUERY_POST = gql`
    query post($id: ID!) {
        post(_id: $id) {
            _id
            postTitle
            postText
            image
            categories
            createdAt
            author
        }
    }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        image
        categories
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        image
        categories
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;