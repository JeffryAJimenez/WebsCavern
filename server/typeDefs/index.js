const { gql } = require("apollo-server-express");
const userTypeDefs = require("./user_typeDefs");
const postTypeDefs = require("./posts_typeDefs");
const adminTypeDefs = require("./admin_typeDefs");

// _  is a placeholder so other Roots can extend
const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, postTypeDefs, adminTypeDefs];
