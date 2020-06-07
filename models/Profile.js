const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    // required: true,
    max: 40,
  },
  location: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
    //passonate traveler, hardcore travel bug...
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },

  likes: [
    {
      user: {
        type: String,
      },
      postID: {
        type: String,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
