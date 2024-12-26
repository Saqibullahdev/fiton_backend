const Feedback = require("../models/feedback");

class FeedbackService {
  async createFeedback(clientId, name, feedback, city) {
    try {
      const feedbackResponse = await new Feedback({
        clientId,
        name,
        feedback,
        city,
      });
      await feedbackResponse.save();
      return feedbackResponse;
    } catch (err) {
      console.log(err);
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
      const feedback= await Feedback.findByIdAndDelete(id);
    if(!feedback) throw new Error('feedback not found');
    return feedback;
    } catch (error) {
      throw new Error(error.message || 'error occured while deleting feedback');
      
    }
  }

  async approveFeedback(id){
    try {
      const feedback=await Feedback.findById(id);
    if(!feedback) throw new Error('feedback not found');
    feedback.isApproved=true;
    await feedback.save();
    return feedback;
    }
    catch (error) {
      throw new Error(error.message || 'error occured while approving feedback');
    }
  }

  async getUnapprovedFeedback(){
    try {
      const feedbacks= await Feedback.find({isApproved:false}).sort({createdAt:-1}).exec();
      if(!feedbacks || feedbacks.length===0) throw new Error('No unapproved feedbacks');
      return feedbacks;
    } catch (error) {
      throw new Error(error.message || 'error occured while fetching unapproved feedbacks');
    }
  }
}

const feedback=new FeedbackService();
module.exports=feedback;
