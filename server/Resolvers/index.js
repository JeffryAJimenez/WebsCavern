const { GraphQLDateTime } = require("graphql-iso-date");

const userResolver = require("./user_resolver");
const adminResolver = require("./admin_resolver");
const postResolver = require("./post_resolver");
const commentResolver = require("./comment_resolver");
const likeResolver = require("./like_resolver");
const collectionResolver = require("./collection_Resolver");
const profileResolver = require("./profile_resolver");

const customDateScalerResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  userResolver,
  postResolver,
  adminResolver,
  commentResolver,
  likeResolver,
  collectionResolver,
  profileResolver,
  customDateScalerResolver,
];
