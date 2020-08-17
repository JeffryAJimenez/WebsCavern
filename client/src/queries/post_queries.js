import { gql } from "@apollo/client";

const getPostByIdQuery = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      tittle
      author
      url
      user {
        username
      }
    }
  }
`;

const getPostByIdQuery_comments = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      tittle
      author
      url
      user {
        username
      }
      comments {
        user
        username
        text
        date
        avatar
      }
    }
  }
`;

const createPostMutation = gql`
  mutation($tittle: String!, $author: String!, $url: String!, $tags: [String]) {
    createPost(
      input: { tittle: $tittle, author: $author, url: $url, tags: $tags }
    ) {
      url
      author
      tittle
      tags
    }
  }
`;

export { getPostByIdQuery, createPostMutation, getPostByIdQuery_comments };
