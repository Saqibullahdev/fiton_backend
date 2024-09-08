const feedbackService = require("../services/feedback_Service");

class FeedbackController {
  async createFeedback(req, res) {
    try {
      const { name, feedback, city } = req.body;
      const Feedback = await feedbackService.createFeedback(
        req.client.id,
        name,
        feedback,
        city
      );
      res.status(201).json({
        ok: true,
        data: Feedback,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "error while creating feedback", ok: false, data: [] });
    }
  }

  async getFeedsback(req, res) {
    try {
      const feedbacks = await feedbackService.getFeedsback();
      res.status(200).json({
        ok: true,
        data: feedbacks,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "error while fetching feedback", ok: false, data: [] });
    }
  }

  async removeFeedback(req, res) {
    try {
      const { id } = req.params;
      const feedback = await feedbackService.removeFeedback(id);
      res.status(200).json({
        ok: true,
        data: feedback,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "error while deleting feedback", ok: false, data: [] });
    }
  }

  async approveFeedback(req, res) {
    try {
      const { id } = req.params;
      const feedback = await feedbackService.approveFeedback(id);
      res.status(200).json({
        ok: true,
        data: feedback,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "error while approving feedback", ok: false, data: [] });
    }
  }
}


const feedbackController = new FeedbackController();