const { combineResolvers } = require("graphql-resolvers");

const User = require("../database/models/userSchema");
const Post = require("../database/models/postSchema");
const Admin = require("../database/models/Admin");
const { isAuthenticated, isAdmin } = require("./middleware");

module.exports = {
  Query: {},

  Mutation: {
    deletePost_Admin: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_, { id }, { loggedInUserId }) => {
        try {
          const admin = await Admin.findOne({ user: loggedInUserId });
          const permit = admin.hasPermissionTo("delete");

          if (!permit) {
            throw new Error("This user cannot delete posts");
          }

          const post = Post.findByIdAndRemove(id);
          if (!post) {
            throw new Error("Post was not found");
          }

          return post;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),

    deleteUser_Admin: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_, { id }, { loggedInUserId }) => {
        try {
          //test this !!!!!!!!!

          const admin = await Admin.findOne({ user: loggedInUserId });
          const permit = admin.hasPermissionTo("Delete");

          console.log("======", permit);
          if (!permit) {
            throw new Error("This admin account cannot delete users");
          }

          const user = await User.findByIdAndRemove(id);
          if (!user) {
            throw new Error("user was not found");
          }
          return user;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),

    editUser_Admin: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_, { id, input }, { loginUserId }) => {
        try {
          const user = await User.findByIdAndUpdate(
            id,
            { ...input },
            { new: true }
          );
          return user;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },
};
