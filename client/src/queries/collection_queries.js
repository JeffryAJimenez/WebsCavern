import { gql } from "@apollo/client";

const getCollectionById = gql`
  query($id: ID!) {
    getACollection(id: $id) {
      id
      tittle
      size
      banner
      posts
    }
  }
`;

export { getCollectionById };
