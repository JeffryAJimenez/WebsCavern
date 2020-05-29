const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

const User = require("../database/models/userSchema");
const Post = require("../database/models/postSchema");
const { isAuthenticated } = require("./middleware");
const PubSub = require("../subscription");
const { userEvents } = require("../subscription/events");

module.exports = {
  Query: {
    user: combineResolvers(isAuthenticated, (_, { id }, { email }) => {
      console.log("====", email);
    }),
    users: () => [
      { id: 1, email: "testEmail", username: "moose" },
      { id: 2, email: "testEmail2", username: "moose2" },
    ],

    currentUser: combineResolvers(isAuthenticated, async (_, __, { email }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),

    usersByUserName: async (_, { username }) => {
      try {
        const users = await User.find({ username });
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (user) {
          throw new Error("Email already exists");
        }

        if (input.password !== input.password2) {
          throw new Error("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);
        const { password2, ...other } = input;
        const newUser = new User({ ...other, password: hashedPassword });
        const result = await newUser.save();

        PubSub.publish(userEvents.USER_CREATED, {
          userCreated: result,
        });

        return result;
      } catch (error) {
        console.log(error);
      }
    },

    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        const secret = process.env.JWT_SECRET_KEY || "secretmy";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d",
        });

        return { token };
      } catch (error) {
        console.log(error);
      }
    },
  },

  Subscription: {
    userCreated: {
      subscribe: () => PubSub.asyncIterator(userEvents.USER_CREATED),
    },
  },

  User: {
    posts: async ({ id }) => {
      try {
        const posts = await Post.find({ user: id });
        return posts;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
