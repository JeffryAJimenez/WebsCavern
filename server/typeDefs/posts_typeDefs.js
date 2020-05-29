const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    posts(cursor: String, limit: Int): PostFeed!
    post(id: ID!): Post
  }

  input createPostInput {
    tittle: String!
    author: String!
    url: String!
  }

  input updatePostInput {
    tittle: String
    author: String
  }

  extend type Mutation {
    createPost(input: createPostInput!): Post
    updatePost(id: ID!, input: updatePostInput!): Post
    deletePost(id: ID!): Post
  }

  type Post {
    id: ID!
    tittle: String!
    author: String!
    url: String!
    user: User!
  }

  type PostFeed {
    postFeed: [Post!]
    pageInfo: PageInfo!
  }

  type PageInfo {
    nextPageCursor: String
    hasNextPage: Boolean
  }
`;
