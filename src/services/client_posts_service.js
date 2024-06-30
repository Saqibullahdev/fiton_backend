const post = require("../models/client_post");
const commentmodel = require("../models/comments_model");
const replymodel = require("../models/commentReplies_model");

class postservices {
  //create post has two argument client_id and post object
  async createPost(
    client_id,
    {
      title,
      description,
      budget,
      availability,
      location,
      durationOfTraining,
      fitnessLevel,
      healthConditionsOrInjuries,
      email,
      phone,
      postDate,
      expirationDate,
      comments,
    }
  ) {
    try {
      const newpost = await post.create({
        client_id,
        title,
        description,
        budget,
        availability,
        location,
        durationOfTraining,
        fitnessLevel,
        healthConditionsOrInjuries,
        email,
        phone,
        postDate,
        expirationDate,
        comments,
      });
      return newpost;
    } catch (error) {
      throw new Error(error.message || "Error creating post");
    }
  }

  //get all posts

  async getAllPosts() {
    try {
        const posts = await post
        .find()
        .sort({ postDate: -1 })
        .populate({
          path: "comments",
          select: "comment client_id trainer_id replies",
          populate: [
            {
              path: "client_id",
              select: "fullname email",
            },

            {
                path: "trainer_id",
                select: "fullname email",
            },
            {
              path: "replies",
              select: "reply client_id trainer_id",
              populate: [
                {
                  path: "client_id",
                  select: "fullname email",
                },
                {
                  path: "trainer_id",
                  select: "fullname email",
                },
              ],
            },
          ],
        })
        .populate({
          path: "client_id",
          select: "email fullname",
        })
        .exec();
      

      if (!posts) {
        throw new Error("No posts found");
      }
      return posts;
    } catch (error) {
      throw new Error(error.message || "Error fetching posts");
    }
  }

  async createComment(clientid, trainerid, comment, postid) {
    try {
      const Post = await post.findById(postid);
      if (!Post) {
        throw new Error("Post not found");
      }

      const newCommentData = { comment };

      if (clientid) {
        newCommentData.client_id = clientid;
      } else if (trainerid) {
        newCommentData.trainer_id = trainerid;
      } else {
        throw new Error("Either clientid or trainerid must be provided");
      }

      const newComment = await commentmodel.create(newCommentData);
      Post.comments.push(newComment._id);
      await Post.save();
      return Post;
    } catch (error) {
      throw new Error(error.message || "Error creating comment");
    }
  }

  async createReply(clientid, trainerid, reply, commentid) {
    try {
      const Comment = await commentmodel.findById(commentid);
      if (!Comment) {
        throw new Error("Comment not found");
      }
      const newReplyData = { reply };
      if (clientid) {
        newReplyData.client_id = clientid;
      } else if (trainerid) {
        newReplyData.trainer_id = trainerid;
      } else {
        throw new Error("Either clientid or trainerid must be provided");
      }
      const newReply = await replymodel.create(newReplyData);
      Comment.replies.push(newReply._id);
      await Comment.save();
      return Comment;
    } catch (error) {
      throw new Error(error.message || "Error creating reply");
    }
  }
}

const postServices = new postservices();
module.exports = postServices;
