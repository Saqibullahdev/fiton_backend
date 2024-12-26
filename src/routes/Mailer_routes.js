const express = require("express");
const MailerRoutes = express.Router();
const {sendMail}=require('../controllers/Mail_Controller')
const limiter=require('../helpers/ApiRateLimiter.js')

MailerRoutes.post("/",limiter, sendMail);
module.exports = MailerRoutes;