const { skip } = require("graphql-resolvers");
const Post = require("../../database/models/postSchema");
const User = require("../../database/models/userSchema");
const { isValidObjectId } = require("../../database/util");

module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error("Access denied! Please login to continue");
  }

  //call the next resolver
  return skip;
};

module.exports.isPostOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid Post id");
    }

    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post was not found");
    } else if (post.user.toString() !== loggedInUserId) {
      throw new Error("Not authorized as post owner");
    }

    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.isPorfileOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid user id");
    }

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    } else if (user._id.toString() !== loggedInUserId) {
      throw new Error("This profile does not belong to you");
    }

    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.isAdmin = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(loggedInUserId);

    if (!user.roles.admin) {
      throw new Error("User is not an administrator");
    }

    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.isCommentOwner = async (
  _,
  { post_id, comment_id },
  { loggedInUserId }
) => {
  try {
    if (!isValidObjectId(post_id)) {
      throw new Error("invalid POST id");
    }
    if (!isValidObjectId(comment_id)) {
      throw new Error("invalid Comment id");
    }

    const post = await Post.findById(post_id);
    const comment = post.comments.find((comment) => comment.id === comment_id);

    if (!comment) {
      throw new Error("Comment doest not exist");
    }

    if (comment.user.toString() !== loggedInUserId) {
      throw new Error("Comment does not belong logged in user");
    }

    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
