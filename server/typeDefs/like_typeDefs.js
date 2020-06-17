const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Mutation {
    like(post_id: ID!): [LikeOutput]!
    unlike(post_id: ID!): [LikeOutput]
  }

  type LikeOutput {
    user: ID
  }
`;
