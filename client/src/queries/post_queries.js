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

export { getPostByIdQuery, createPostMutation };
