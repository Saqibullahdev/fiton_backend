const express = require('express');
const { createPostValidator,isClient,isTrainerOrClient} = require('../middlewares/index'); // Ensure correct path
const { createpost,comment,getAllPosts,reply } = require('../controllers/client_posts_controller'); // Ensure correct path

const clientPostRouter = express.Router();

clientPostRouter.post('/create',createPostValidator,isClient, createpost);
clientPostRouter.post('/comment/:id',isTrainerOrClient,comment);
clientPostRouter.get('/',getAllPosts);
clientPostRouter.post('/reply/:id',isTrainerOrClient,reply);

module.exports = clientPostRouter;
