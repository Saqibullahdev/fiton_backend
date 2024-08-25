const express = require("express");
const trainerRouter = express.Router();
const {
  isTrainer,
  createTrainerValidator,
  isAdmin,
} = require("../middlewares/index");

const {
  loginTrainer,
  logoutTrainer,
  createTrainer,
  verifyTrainer,
  getTrainers,
  isLoggedIn,
  UnVerifiedTrainers,
  deleteTrainer,
  getTrainerById
} = require("../controllers/trainer_controller");

trainerRouter.post("/login", loginTrainer);
trainerRouter.post("/logout", logoutTrainer);
trainerRouter.post("/create", createTrainerValidator, createTrainer);
trainerRouter.post("/verify/:id", isAdmin, verifyTrainer);
trainerRouter.get("/", getTrainers);
trainerRouter.get("/isloggedin", isTrainer, isLoggedIn);
trainerRouter.get("/unverified", isAdmin, UnVerifiedTrainers);
trainerRouter.delete("/delete/:id", isAdmin, deleteTrainer);
trainerRouter.get("/me", getTrainerById);
module.exports = trainerRouter;
