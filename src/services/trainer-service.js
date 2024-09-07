const Trainer = require("../models/trainer_model");
const { hashPassword ,verifyPassword} = require("../helpers/hashpassword");
const { generateToken } = require("../helpers/jwtToken");
const {generateOTP} =require('../helpers/Otp')
const {sendEmail}=require('../utils/sendEmail')
const {uploadFileToCloudinary}=require('../utils/UploadToCloudnary')
const isFileTypeSupported=require('../utils/isFileTypeSupported')



class trainerServices {
  async createTrainer(
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
  ) {
    try {
      const file=req.files.file;
      const filetype=file.name.split('.')[1].toLowerCase();
      const isSupported=isFileTypeSupported(filetype);
      if(!isSupported){
        throw new Error('File type not supported');
      }
      const uploadedFile=await uploadFileToCloudinary(file,10);
      if(!uploadedFile){
        throw new Error('Error uploading file to cloudnary');
      }

      const hashedPassword = await hashPassword(password);
      const trainer = new Trainer({
        fullname,
        email,
        phone_number,
        password: hashedPassword,
        gender,
        date_of_birth,
        role: "trainer",
        expertise,
        certification,
        experience,
        availability,
        biography,
        training_locations,
        isVerified: false,
        imageUrl:uploadedFile.secure_url,
      });
      await trainer.save();
      return trainer;
    } catch (error) {
      throw new Error(error.message || "Error creating trainer");
    }
  }

  async LoginTrainer(email, password) {
    try {
      const trainer = await Trainer.findOne({ email });
      if (!trainer) {
        throw new Error("Trainer not found");
      }
      const isValidPassword = await verifyPassword(password, trainer.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      const token = generateToken({
        id: trainer._id,
        email: trainer.email,
        role: "trainer",
        username: trainer.fullname,
        isVerified: trainer.isVerified,
      });
      if (!token) {
        throw new Error("Error generating token");
      }
      return token;
    } catch (error) {
      throw new Error(error.message || "Error logging in trainer");
    }
  }

  async verifyTrainer(trainerId) {
    try {
      const trainer = await Trainer.findById(trainerId);
      if (!trainer) {
        throw new Error("Trainer not found");
      }
      trainer.isVerified = true;
      await trainer.save();
      return trainer;
    } catch (error) {
      throw new Error(error.message || "Error verifying trainer");
    }
  }

  async getTrainers() {
    try {
      const trainers = await Trainer.find({ isVerified: true });
      return trainers;
    } catch (error) {
      throw new Error("Error fetching trainers");
    }
  }

  async deleteTrainer(trainerId) {
    try {
      const trainer = await Trainer.findByIdAndDelete(trainerId);
      if (!trainer) {
        throw new Error("Trainer not found");
      }
      return trainer;
    } catch (error) {
      throw new Error(error.message || "Error deleting trainer");
    }
  }

  async getUnVerifiedTrainer() {
    try {
      const trainers = await Trainer.find({ isVerified: false });
      return trainers;
    } catch (error) {
      throw new Error(ërror.message || "Error fetching unverified trainers");
    }
  }

  async getTrainerById(trainerId) {
    try {
      const trainer = await Trainer.findById(trainerId).select("-password");
      if (!trainer) {
        throw new Error("Trainer not found");
      }
      return trainer;
    } catch (error) {
      throw new Error(error.message || "Error fetching trainer");
    }
  }

  async updateTrainer(
    trainerId,
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
  ) {
    try {
      const trainer = await Trainer.findById(trainerId);
      if (!trainer) {
        throw new Error("Trainer not found");
      }
      const updatedTrainer = {
        fullname: fullname || trainer.fullname,
        email: email || trainer.email,
        phone_number: phone_number || trainer.phone_number,
        gender: gender || trainer.gender,
        date_of_birth: date_of_birth || trainer.date_of_birth,
        expertise: expertise || trainer.expertise,
        certification: certification || trainer.certification,
        experience: experience || trainer.experience,
        availability: availability || trainer.availability,
        biography: biography || trainer.biography,
        training_locations: training_locations || trainer.training_locations,
      };
      const response = await Trainer.findByIdAndUpdate(
        trainerId,
        updatedTrainer,
        {
          new: true,
        }
      );
      if (!response) {
        throw new Error("Error updating trainer");
      }
      return response;
    } catch (error) {
      throw new Error(error.message || "Error updating trainer");
    }
  }

  async ChangePassword(trainerId, oldPassword, newPassword) {
    try {
      const trainer = await Trainer.findById(trainerId);
      if (!trainer) {
        throw new Error("Trainer not found for respective id");
      }
      const isValidPassword = await verifyPassword(
        oldPassword,
        trainer.password
      );
      if (!isValidPassword) {
        throw new Error("Invalid password ,old password is incorrect");
      }
      const hashedPassword = await hashPassword(newPassword);
      trainer.password = hashedPassword;
      await trainer.save();
      return trainer;
    } catch (error) {
      throw new Error(
        error.message || "Error changing password...Please try again"
      );
    }
  }

  async fileUploadtoCloudnary(req){
    const file=req.files.file;
    const filetype=file.name.split('.')[1].toLowerCase();
    const isSupported=isFileTypeSupported(filetype);
    if(!isSupported){
      throw new Error('File type not supported');
    }
  
    try{
        const uploadedFile=await uploadFileToCloudinary(file,10);
        return uploadedFile;      
      
    }
    catch(error){
      throw new Error(error.message || 'Error uploading file to cloudnary');
    }
  
  }

  async sendOTP(email) {
    try {
      const trainer = await Trainer.findOne({ email });
      if (!trainer) {
        throw new Error("trainer not found with the provided email");
      }
      const otp = generateOTP();
      const subject = "Password Reset OTP";
      const message = `Your OTP is ${otp}`;
      trainer.otp = otp;
      trainer.otpExpires = Date.now() + 360000; //mean current time + 360000ms = 6 minutes
      await trainer.save();

      const response = await sendEmail(email, subject, message);
      if (!response) {
        throw new Error("Error sending OTP to your email");
      }
      return otp;
    } catch (error) {
      throw new Error(error.message || "Error sending OTP to your email");
    }
  }

  async verifyOTP(email, otp, newPassword) {
    try {
      const trainer = await Trainer.findOne({ email });
      if (!trainer) {
        throw new Error("trainer not found with the provided email");
      }
      if (otp !== trainer.otp || Date.now() > trainer.otpExpires) {
        throw new Error("Invalid OTP");
      }
      const hashedPassword = await hashPassword(newPassword);
      trainer.password = hashedPassword;
      trainer.otp = null;
      trainer.otpExpires = null;
      await trainer.save();
      return trainer;
    } catch (error) {
      throw new Error(error.message || "Error verifying OTP");
    }
  }
}

module.exports = new trainerServices();
