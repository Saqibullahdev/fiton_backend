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
      training_locations
    );

    res.status(StatusCodes.CREATED).json({
      message: "Trainer created successfully",
      data: trainer,
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error creating trainer:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error creating trainer",
      success: false,
    });
  }
};


//login a trainer

const loginTrainer = async (req, res) => {
    try {
        const { email, password } = req.body;
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
        console.error("Error logging in trainer:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error logging in trainer",
        success: false,
        });
    }
    };

//logout a trainer

const logoutTrainer = async (req, res) => {
    try {
        res.clearCookie("trainer_token");
        res.status(StatusCodes.OK).json({
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
}


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
}


//get all trainers

const getTrainers = async (req, res) => {
    try {
        const trainers = await trainerServices.getTrainers();
        res.status(StatusCodes.OK).json({
        message: "Trainers fetched successfully",
        data: trainers,
        status: "success",
        ok: true,
        });
    } catch (error) {
        console.error("Error fetching trainers:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error fetching trainers",
        success: false,
        });
    }
}

const isLoggedIn=async(req,res,next)=>{
  const trainer=req.trainer
  res.status(StatusCodes.OK).
  json({
      message:'trainer is logged in',
      data:client,
      status:'success',
      ok:true
  })
}

module.exports = { createTrainer, loginTrainer, logoutTrainer, verifyTrainer, getTrainers ,isLoggedIn};