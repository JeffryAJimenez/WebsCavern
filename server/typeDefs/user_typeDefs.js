const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User!]
    usersByUserName(username: String!): [User!]
    user(id: ID!): User
    currentUser: User
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): Token
  }

  extend type Subscription {
    userCreated: User
  }

  type Token {
    token: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input signupInput {
    name: String!
    username: String!
    email: String!
    password: String!
    password2: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
    posts: [Post!]
  }
`;
