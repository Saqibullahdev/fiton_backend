const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

      replies:{
        type: [Schema.Types.ObjectId],
        ref: "CommentReply",
        default: [],
      }
    },
    { timestamps: true }
  );
  
  

module.exports = mongoose.model('Comment', commentsSchema);