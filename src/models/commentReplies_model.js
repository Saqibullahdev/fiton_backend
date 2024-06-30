const mongoose = require('mongoose');
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
  
 

module.exports = mongoose.model('CommentReply', commentreplySchema);