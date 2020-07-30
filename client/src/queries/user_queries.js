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

export { resgisterUserMutation };
