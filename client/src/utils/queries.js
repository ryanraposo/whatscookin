import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
  query Query {
    categories {
      _id
      name
    }
  }
`
export const QUERY_POSTS = gql`
  query Posts {
    posts {
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

export const QUERY_POST = gql`
  query Post($id: ID!) {
    post(_id: $id) {
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

export const QUERY_USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      posts {
        _id
        postTitle
        postBody
        categories {
          _id
          name
        }
        createdAt
        commentsCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      posts {
        _id
        postTitle
        postBody
        username
        categories {
          _id
          name
        }
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  query Query {
    me {
      _id
      username
      email
    }
  }
`;