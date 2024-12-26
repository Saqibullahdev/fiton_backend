const express = require('express');
const adminrouter = require('./admin_routes');
const clientrouter = require('./client_routes');
const trainerrouter = require('./trainer_routes');
const client_postsrouter = require('./client_posts_routes');
const feedbackRouter=require('./feedback_routes');
const MailRoutes=require('./Mailer_routes');

const router = express.Router();

router.use('/admin', adminrouter);
router.use('/client', clientrouter);
router.use('/post', client_postsrouter);
router.use('/trainer', trainerrouter);
router.use('/feedback',feedbackRouter);
router.use('/mail',MailRoutes);
module.exports = router;
