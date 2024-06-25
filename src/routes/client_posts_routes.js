const express=require('express');
const clientPostRouter=express.Router();
const {postValidator}=require('../middlewares/index')

const { createClient, loginClient,logoutClient,}=require('../controllers/client_controller');


