const router = require('express').Router();
const srouter = require('express').Router();
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');

const def = (req,res,next) => {
	res.send('Api Running....');
}

router.route('/').get(def);
router.route('/create/user').post(UserController.createUser);
srouter.route('/users').get(UserController.list);
srouter.route('/users/:userid').get(UserController.getById);
srouter.route('/users/:userid/profile').get(UserController.getProfile);

srouter.route('/posts/create').post(PostController.createPost);
srouter.route('/posts/:postid').get(PostController.getById);
srouter.route('/posts/:userid/posts').get(PostController.getAllPostByUser);
srouter.route('/posts').patch(PostController.updatePost);

srouter.route('/posts/comments').post(CommentController.createComment);
srouter.route('/posts/comments').patch(CommentController.updateComment);

module.exports = {router,srouter};
