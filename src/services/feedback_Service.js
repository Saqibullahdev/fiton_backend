const Feedback = require("../models/feedback");

class FeedbackService {
  async createFeedback(clientId, name, feedback, city) {
    try {
      const feedback = new Feedback({
        clientId,
        name,
        feedback,
        city,
      });
      await feedback.save();
      return feedback;
    } catch (err) {
      throw err;
    }
  }

  async getFeedsback() {
    try {
      const feedsback = await Feedback.find({isApproved:true}).sort({createdAt:-1}).exec();
      if (!feedsback || feedsback.length === 0)
        throw new Error("No feedback in database");
      return feedsback;
    } catch (error) {
      throw new Error(
        error.message || "error occured while fetching feedbacks from database"
      );
    }
  }

  async removeFeedback(id){
    try {
      const feedback=Feedback.findByIdAndDelete(id);
    if(!feedback) throw new Error('feedback not found');
    return feedback;
    } catch (error) {
      throw new Error(error.message || 'error occured while deleting feedback');
      
    }
  }

  async approveFeedback(id){
    try {
      const feedback=Feedback.findById(id);
    if(!feedback) throw new Error('feedback not found');
    feedback.isApproved=true;
    await feedback.save();
    return feedback;
    }
    catch (error) {
      throw new Error(error.message || 'error occured while approving feedback');
    }
  }
}

const feedback=new FeedbackService();
module.exports=feedback;
