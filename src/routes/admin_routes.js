const express=require('express');
const adminrouter=express.Router();
const {isAdmin,createAdminValidator}=require('../middlewares/index')
const { createAdmin, loginAdmin, logoutAdmin,isLoggedIn}=require('../controllers/admin_controller');

adminrouter.post('/create',createAdminValidator,createAdmin);
adminrouter.post('/login',loginAdmin);
adminrouter.post('/logout',logoutAdmin);
adminrouter.get('/isloggedin',isAdmin,isLoggedIn);

module.exports= adminrouter ;