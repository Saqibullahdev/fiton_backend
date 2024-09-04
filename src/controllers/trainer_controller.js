const trainerServices = require("../services/trainer-service");
const { StatusCodes } = require("http-status-codes");

const createTrainer = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone_number,
      password,
      gender,
      date_of_birth,
      expertise,
      certification,
      experience,
      availability,
      biography,
      training_locations,
    } = req.body;

    const trainer = await trainerServices.createTrainer(
      fullname,
      email,
      phone_number,
      password,
      gender,
      date_of_birth,
      expertise,
      certification,
      experience,
      availability,
      biography,
      training_locations,
      req
    );

    res.status(StatusCodes.CREATED).json({
      message: "Trainer created successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error creating trainer",
      success: false,
    });
  }
};

//login a trainer

const loginTrainer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Please provide email and password",
        success: false,
      });
    }
    const token = await trainerServices.LoginTrainer(email, password);
    res.cookie("trainer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({
      message: "Trainer logged in successfully",
      data: token,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error logging in trainer",
      success: false,
    });
  }
};

//logout a trainer

const logoutTrainer = async (req, res) => {
  try {
    return res.clearCookie("trainer_token").status(StatusCodes.OK).json({
      message: "Trainer logged out successfully",
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error logging out trainer:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error logging out trainer",
      success: false,
    });
  }
};

//verify a trainer

const verifyTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const trainer = await trainerServices.verifyTrainer(trainerId);
    res.status(StatusCodes.OK).json({
      message: "Trainer verified successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error verifying trainer:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error verifying trainer",
      success: false,
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const trainer = await trainerServices.deleteTrainer(trainerId);
    res.status(StatusCodes.OK).json({
      message: "Trainer deleted successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error deleting trainer",
      success: false,
    });
  }
};

//get all trainers

const getTrainers = async (req, res) => {
  try {
    const trainers = await trainerServices.getTrainers();
    res.status(StatusCodes.OK).json({
      message: "Trainers fetched successfully",
      status: "success",
      ok: true,
      data: trainers,
    });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error fetching trainers",
      success: false,
    });
  }
};

const UnVerifiedTrainers = async (req, res) => {
  try {
    const trainers = await trainerServices.getUnVerifiedTrainer();
    res.status(StatusCodes.OK).json({
      message: "Unverified trainers fetched successfully",
      status: "success",
      ok: true,
      data: trainers,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error fetching unverified trainers",
      success: false,
    });
  }
};

const isLoggedIn = async (req, res, next) => {
  const trainer = req.trainer;
  res.status(StatusCodes.OK).json({
    message: "trainer is logged in",
    data: trainer,
    status: "success",
    ok: true,
  });
};

const getTrainerById = async (req, res) => {
  try {
    const trainer = await trainerServices.getTrainerById(req.trainer.id);
    res.status(StatusCodes.OK).json({
      message: "Trainer fetched successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error fetching trainer",
      success: false,
    });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone_number,
      gender,
      date_of_birth,
      expertise,
      certification,
      experience,
      availability,
      biography,
      training_locations,
    } = req.body;
    console.log("request pass to service");
    console.log("trainer id", req.trainer.id);
    const trainer = await trainerServices.updateTrainer(
      req.trainer.id,
      fullname,
      email,
      phone_number,
      gender,
      date_of_birth,
      expertise,
      certification,
      experience,
      availability,
      biography,
      training_locations
    );

console.log("response from service", trainer);
    res.status(StatusCodes.OK).json({
      message: "Trainer updated successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error updating trainer",
      success: false,
    });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const trainer = await trainerServices.ChangePassword(
      req.trainer.id,
      oldPassword,
      newPassword
    );
    res.status(StatusCodes.OK).json({
      message: "Password changed successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error changing password",
      success: false,
    });
  }
}

const fileUploadtoCloudnary=async(req,res)=>{
  try {
    const response=await trainerServices.fileUploadtoCloudnary(req);
  res.status(StatusCodes.OK).json({
    message: "File uploaded successfully",
    data: response,
    status: "success",
    ok: true,
  });
  
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error uploading file",
      success: false,
    });
    
  }
}
module.exports = {
  createTrainer,
  getTrainerById,
  loginTrainer,
  logoutTrainer,
  verifyTrainer,
  getTrainers,
  isLoggedIn,
  UnVerifiedTrainers,
  deleteTrainer,
  updateTrainer,
  ChangePassword,
  fileUploadtoCloudnary,
  
};
