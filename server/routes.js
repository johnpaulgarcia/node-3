const router = require('express').Router();
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');
const def = (req,res,next) => {
	res.send('Api Running....');
}

router.route('/').get(def);
router.route('/create/user').post(UserController.createUser);
router.route('/users').get(UserController.list);
router.route('/users/:userid').get(UserController.getById);
router.route('/users/:userid/profile').get(UserController.getProfile);

router.route('/posts/create').post(PostController.createPost);
router.route('/posts/:postid').get(PostController.getById);
router.route('/posts/:userid/posts').get(PostController.getAllPostByUser);
router.route('/posts').patch(PostController.updatePost);

router.route('/posts/comments').post(CommentController.createComment);
router.route('/posts/comments').patch(CommentController.updateComment);

module.exports = router;
