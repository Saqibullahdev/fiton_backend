const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    durationOfTraining: {
      type: String,
      required: true,
    },
    fitnessLevel: {
      type: String,
      required: true,
    },
    healthConditionsOrInjuries: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: true,
    },

    postDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    comments: {
      type:[Schema.Types.ObjectId],
      ref: "Comment",
      default: null,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
