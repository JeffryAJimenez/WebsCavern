import { gql } from "@apollo/client";

const IsUserLoggedInQuery = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export { IsUserLoggedInQuery };
