const express=require('express');
const trainerRouter=express.Router();
const {isTrainer,createTrainerValidator}=require('../middlewares/index')


const {loginTrainer,logoutTrainer,createTrainer,verifyTrainer,getTrainers,isLoggedIn}=require('../controllers/trainer_controller');

trainerRouter.post('/login',createTrainerValidator,loginTrainer);
trainerRouter.post('/logout',logoutTrainer);
trainerRouter.post('/create',createTrainer);
trainerRouter.get('/verify/:id',isTrainer,verifyTrainer);
trainerRouter.get('/get',getTrainers);
trainerRouter.get('/isloggedin',isTrainer,isLoggedIn);

module.exports= trainerRouter;