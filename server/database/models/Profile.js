const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});
