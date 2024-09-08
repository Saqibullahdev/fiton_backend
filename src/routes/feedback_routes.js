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

feedback.post("/",isClient,feedbackController.createFeedback);
feedback.get("/",feedbackController.getFeedsback);
feedback.delete("/:id",isAdmin,feedbackController.removeFeedback);
feedback.patch("/:id",feedbackController.approveFeedback);

module.exports=feedbackRouter;