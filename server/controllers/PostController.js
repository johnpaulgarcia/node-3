exports.createPost = (req,res,next) => {
	let {userid,content} = req.body;
	const db = req.app.get('db');
	db.posts.save({userid,content})
		.then(post=>res.status(200).json(post))
		.catch((err)=>res.status(500).end())
}

exports.getById = (req,res,next) => {
	let {postid} = req.params;
	let {comments} = req.query;
	comments = comments === "true" ? true : false;
	const db = req.app.get('db'); 
	db.posts.findOne(postid)
		.then((post)=>{
			comments ? db.comments.find({"postId":postid})
			 .then((cmt)=> {
				res.status(200).json({post,cmt});
			}) : res.status(200).json(post)
		  })
		.catch((err)=>res.status(500).end())
}

exports.getAllPostByUser  = (req,res,next) => {
	let {userid} = req.params;
	const db = req.app.get('db');
	db.posts.find(userid)
		.then(posts=>res.status(200).json(posts))
		.catch((err)=>res.status(500).end())
}

exports.updatePost = (req,res,next) => {
	let {postid,content} = req.body;
	const db = req.app.get('db');
	db.posts.update(postid,{content})
		.then(post=>res.status(200).json(post))
		.catch((err)=>res.status(500).end())
}
