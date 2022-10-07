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
      postText
      image
      categories {
        _id
        name
      }
      createdAt
      author {
        _id
        username
      }
    }
  }
`;

export const QUERY_POST = gql`
  query Post($id: ID!) {
    post(_id: $id) {
      _id
      postTitle
      postText
      image
      categories {
        _id
        name
      }
      createdAt
      author {
        _id
        username
      }
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
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
      username
      posts {
        _id
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
  }
`;

export const QUERY_ME_BASIC = gql`
  query Me {
    me {
      _id
      email
      username
    }
  }
`;