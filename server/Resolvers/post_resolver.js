const { combineResolvers } = require("graphql-resolvers");

const Post = require("../database/models/postSchema");
const User = require("../database/models/userSchema");
const { isAuthenticated, isPostOwner } = require("./middleware");
const { stringToBase64, base64ToString } = require("../helper");

module.exports = {
  Query: {
    post: combineResolvers(isAuthenticated, isPostOwner, async (_, { id }) => {
      try {
        const post = Post.findById(id);
        return post;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),

    posts: combineResolvers(
      isAuthenticated,
      async (_, { cursor, limit = 10 }, { loggedInUserId }) => {
        try {
          const query = { user: loggedInUserId };
          if (cursor) {
            query["_id"] = {
              $lt: base64ToString(cursor),
            };
          }

          let posts = await Post.find(query)
            .sort({ _id: -1 })
            .limit(limit + 1);
          const hasNextPage = posts.length > limit;
          posts = hasNextPage ? posts.slice(0, -1) : posts;

          return {
            postFeed: posts,
            pageInfo: {
              nextPageCursor: hasNextPage
                ? stringToBase64(posts[posts.length - 1].id)
                : null,
              hasNextPage,
            },
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),

    postsByTittle: async (_, { tittle, cursor, limit = 10 }) => {
      try {
        const query = { tittle };
        if (cursor) {
          query["_id"] = {
            $lt: base64ToString(cursor),
          };
        }

        let posts = await Post.find(query)
          .sort({ author: -1 })
          .limit(limit + 1);

        const hasNextPage = posts.length > limit;
        posts = hasNextPage ? posts.slice(0, -1) : posts;

        return {
          postFeed: posts,
          pageInfo: {
            nextPageCursor: hasNextPage
              ? stringToBase64(posts[posts.length - 1].id)
              : null,
            hasNextPage,
          },
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    postsByAuthor: async (_, { author, cursor, limit = 10 }) => {
      try {
        const query = { author };
        if (cursor) {
          query["_id"] = {
            $lt: base64ToString(cursor),
          };
        }

        let posts = await Post.find(query)
          .sort({ _id: -1 })
          .limit(limit + 1);

        const hasNextPage = posts.length > limit;
        posts = hasNextPage ? posts.slice(0, -1) : posts;

        return {
          postFeed: posts,
          pageInfo: {
            nextPageCursor: hasNextPage
              ? stringToBase64(posts[posts.length - 1].id)
              : null,
            hasNextPage,
          },
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    deletePost: combineResolvers(
      isAuthenticated,
      isPostOwner,
      async (_, { id }, { loggedInUserId }) => {
        const post = await Post.findByIdAndRemove(id);
        await User.updateOne(
          { _id: loggedInUserId },
          { $pull: { posts: post.id } }
        );

        return post;
      }
    ),
    updatePost: combineResolvers(
      isAuthenticated,
      isPostOwner,
      async (_, { id, input }) => {
        try {
          const post = await Post.findByIdAndUpdate(
            id,
            { ...input },
            {
              new: true,
            }
          );
          return post;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    createPost: combineResolvers(
      isAuthenticated,
      async (_, { input }, { email }) => {
        try {
          //create Post -> Give post User._ID -> give User Post._ID
          const user = await User.findOne({ email });
          const post = new Post({ ...input, user: user.id });
          const result = await post.save();
          user.posts.push(result.id);
          await user.save();

          return post;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },
  Post: {
    user: async (parent, _, { loaders }) => {
      try {
        // const user = await User.findById(parent.user);
        const user = await loaders.user.load(parent.user.toString());
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
