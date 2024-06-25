const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentreplySchema = new Schema(
  {
    reply: {
      type: String,
      required: true,
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      default: null,
    },
    trainer_id: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      default: null,
    },
  },
  { timestamps: true }
);

commentreplySchema.pre("validate", function (next) {
  if (this.client_id && this.trainer_id) {
    next(
      new Error(
        "A reply can only be from either a client or a trainer, not both."
      )
    );
  } else if (!this.client_id && !this.trainer_id) {
    next(new Error("A reply must be from either a client or a trainer."));
  } else {
    next();
  }
});

const commentsSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      default: null,
    },
    trainer_id: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      default: null,
    },
    replies: [commentreplySchema],
  },
  { timestamps: true }
);

commentsSchema.pre("validate", function (next) {
  if (this.client_id && this.trainer_id) {
    next(
      new Error(
        "A comment can only be from either a client or a trainer, not both."
      )
    );
  } else if (!this.client_id && !this.trainer_id) {
    next(new Error("A comment must be from either a client or a trainer."));
  } else {
    next();
  }
});

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
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    comments: [commentsSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
