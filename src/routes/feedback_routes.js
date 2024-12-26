/**
 * this file is used to define the routes for the feedbacks
 */

const feedbackController=require('../controllers/feedback');
const express = require("express");
const feedbackRouter = express.Router();
const {
    isClient,
    isAdmin,
  } = require("../middlewares/index");

feedbackRouter.post("/",isClient,feedbackController.createFeedback);
feedbackRouter.get("/",feedbackController.getFeedsback);
feedbackRouter.delete("/:id",isAdmin,feedbackController.removeFeedback);
feedbackRouter.patch("/:id",feedbackController.approveFeedback);
feedbackRouter.get("/unapproved",feedbackController.getUnapprovedFeedback);

module.exports=feedbackRouter;