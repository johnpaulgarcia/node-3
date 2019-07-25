exports.createComment = (req,res,next) => {
	let {userid,postid,comment} = req.body;
	const db = req.app.get('db');
	db.comments.save({userId:userid,postId:postid,comment})
		.then(cmt => res.status(200).json(cmt))
		.catch((err)=>console.log(err))
}

exports.updateComment = (req,res,next) => {
	let {commentid,comment} = req.body;
	const db = req.app.get('db');
	db.comments.update(commentid,{comment})
		.then(cmt => res.status(200).json(cmt))
		.catch((err)=>res.status(500).end())
}
