const postServices = require("../services/client_posts_service");

const createpost = async (req, res) => {
  try {
    const clientid = req.client.id;
    console.log(clientid);
    const post = await postServices.createPost(clientid, req.body);
    res.status(201).json({
      message: "Post created successfully",
      status: "success",
      ok: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error creating post",
      success: false,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postServices.getAllPosts();
    res.status(200).json({
      success: true,
      ok: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error fetching posts",
      success: false,
    });
  }
};

const comment = async (req, res) => {
  try {
    if(!req.body.comment){
      return res.status(400).json({
        message: "Comment cannot be empty",
        status: "error",
        ok: false,
      });
    }
    const clientid = req.client?.id;
    console.log(clientid);
    const trainerid = req.trainer?.id;
    const postid = req.params.id;
    if (clientid) {
      console.log("inside client saqib");
      const post = await postServices.createComment(
        clientid,
        null,
        req.body.comment,
        postid
      );
      res.status(201).json({
        message: "Comment created successfully",
        status: "success",
        ok: true,
        data: post,
      });
    } else if (trainerid) {
      const post = await postServices.createComment(
        null,
        trainerid,
        req.body.comment,
        postid
      );
      res.status(201).json({
        message: "Comment created successfully",
        status: "success",
        ok: true,
        data: post,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error creating comment",
      success: false,
    });
  }
};

const reply = async (req, res) => {
  try {
    if(!req.body.reply){
      return res.status(400).json({
        message: "Reply cannot be empty",
        status: "error",
        ok: false,
      });
    }
    const clientid = req.client?.id;
    console.log(clientid);
    const trainerid = req.trainer?.id;
    const commentid = req.params.id;
    if (clientid) {
      console.log("inside client saqib");
      const post = await postServices.createReply(
        clientid,
        null,
        req.body.reply,
        commentid
      );
      res.status(201).json({
        message: "Reply created successfully",
        status: "success",
        ok: true,
        data: post,
      });
    } else if (trainerid) {
      const post = await postServices.createReply(
        null,
        trainerid,
        req.body.reply,
        commentid
      );
      res.status(201).json({
        message: "Reply created successfully",
        status: "success",
        ok: true,
        data: post,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error creating reply",
      success: false,
    });
  }
};

module.exports = {
  createpost,
  comment,
  getAllPosts,
  reply
};
