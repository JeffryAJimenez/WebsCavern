import { gql } from "@apollo/client";

const resgisterUserMutation = gql`
  mutation(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
    $password2: String!
  ) {
    signup(
      input: {
        username: $username
        name: $name
        email: $email
        password: $password
        password2: $password2
      }
    ) {
      username
    }
  }
`;

const loginUserMutation = gql`
  mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

const getLoggedInUseQuery = gql`
  query {
    currentUser {
      id
      name
      email
      username
      profile
    }
  }
`;

const getUserByIdQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      username
      email
      profile
    }
  }
`;

export {
  resgisterUserMutation,
  loginUserMutation,
  getLoggedInUseQuery,
  getUserByIdQuery,
};
