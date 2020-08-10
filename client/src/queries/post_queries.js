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

export { getPostByIdQuery };
