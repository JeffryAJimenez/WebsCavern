import { gql } from "@apollo/client";

const getProfileQuery = gql`
  query($id: ID!) {
    profile(id: $id) {
      id
      collectionsSize
      postSize
      collections
      posts
    }
  }
`;

export { getProfileQuery };
