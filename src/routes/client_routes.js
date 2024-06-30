const express=require('express');
const clientRouter=express.Router();
const {isClient,createClientValidator}=require('../middlewares/index')

const { createClient, loginClient,logoutClient,isLoggedIn}=require('../controllers/client_controller');

clientRouter.post('/create',createClientValidator,createClient);
clientRouter.post('/login',loginClient);
clientRouter.post('/logout',logoutClient);
clientRouter.get('/isloggedin',isClient,isLoggedIn);

module.exports= clientRouter;