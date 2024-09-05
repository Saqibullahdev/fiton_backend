const express = require("express");
const {
  createPostValidator,
  isClient,
  isTrainerOrClient,
  isAdmin,
} = require("../middlewares/index"); // Ensure correct path
const {
  createpost,
  comment,
  getAllPosts,
  reply,
  deletePost,
  getPostByClientId,
  makePostasReadByAdmin,
  makePostasReadByTrainer,
  approvePost,
  getUnApprovedPosts,
  removePost,
} = require("../controllers/client_posts_controller"); // Ensure correct path

const clientPostRouter = express.Router();

clientPostRouter.post("/create", createPostValidator, isClient, createpost);
clientPostRouter.post("/comment/:id", isTrainerOrClient, comment);
clientPostRouter.get("/", getAllPosts);
clientPostRouter.post("/reply/:id", isTrainerOrClient, reply);
clientPostRouter.delete("/delete", isAdmin, deletePost);
clientPostRouter.get("/myposts", isClient, getPostByClientId);
clientPostRouter.patch("/admin/:id", isAdmin, makePostasReadByAdmin);
clientPostRouter.patch("/approve/:id", isAdmin, approvePost);
clientPostRouter.get("/unapproved", isAdmin, getUnApprovedPosts);
clientPostRouter.delete("/:id", isAdmin, removePost);
clientPostRouter.patch(
  "/trainer/:id",
  isTrainerOrClient,
  makePostasReadByTrainer
);

module.exports = clientPostRouter;
