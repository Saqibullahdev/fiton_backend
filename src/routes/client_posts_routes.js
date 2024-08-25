const express = require('express');
const { createPostValidator,isClient,isTrainerOrClient, isAdmin} = require('../middlewares/index'); // Ensure correct path
const { createpost,comment,getAllPosts,reply ,deletePost,getPostByClientId} = require('../controllers/client_posts_controller'); // Ensure correct path

const clientPostRouter = express.Router();

clientPostRouter.post('/create',createPostValidator,isClient, createpost);
clientPostRouter.post('/comment/:id',isTrainerOrClient,comment);
clientPostRouter.get('/',getAllPosts);
clientPostRouter.post('/reply/:id',isTrainerOrClient,reply);
clientPostRouter.delete('/delete',isAdmin,deletePost);
clientPostRouter.get('/myposts',isClient,getPostByClientId);


module.exports = clientPostRouter;
