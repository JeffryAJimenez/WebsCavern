const { skip } = require("graphql-resolvers");
const Post = require("../../database/models/postSchema");
const User = require("../../database/models/userSchema")
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

module.exports.isPorfileOwner = async (_, {id}, {loggedInUserId}) => {
  try {
    if(!isValidObjectId(id)){
      throw new Error("Invalid user id")
    }

    const user = await User.findById(id)

    if(!user){
      throw new Error("User not found")
    }else if(user._id.toString() !== loggedInUserId){
      throw new Error("This profile does not belong to you")
    }

    return skip
    
  } catch (error) {
    console.log(error)
    throw error
  }
}
