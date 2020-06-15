const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
    },

    commets: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String },
        text: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
