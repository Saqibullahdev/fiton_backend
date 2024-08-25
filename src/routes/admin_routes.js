const express=require('express');
const adminrouter=express.Router();
const {isAdmin,createAdminValidator}=require('../middlewares/index')
const { createAdmin, loginAdmin, logoutAdmin,isLoggedIn,getAdminById,UpdateProfile,ChangePassword}=require('../controllers/admin_controller');

adminrouter.post('/create',createAdminValidator,createAdmin);
adminrouter.post('/login',loginAdmin);
adminrouter.post('/logout',logoutAdmin);
adminrouter.get('/isloggedin',isAdmin,isLoggedIn);
adminrouter.get('/',isAdmin,getAdminById);
adminrouter.patch('/',isAdmin,UpdateProfile);
adminrouter.patch('/password',isAdmin,ChangePassword);

module.exports= adminrouter ;