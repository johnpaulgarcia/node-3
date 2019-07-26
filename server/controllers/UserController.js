const secret = require('../../secret');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
exports.createUser = (req,res,next) => {
	let {email,password} = req.body;
	const db = req.app.get('db');
	argon2.hash(password)
	.then(hash=>{
	db.users.insert({
		    email,
		    password:hash,
		    user_profiles: 
			   [
			    {
				userId: undefined,
				about: null,
				thumbnail: null,
			     }
			  ]
		},{fields: ['id','email']},{deepInsert: true,})
	   .then(user=>{
		  const token =  jwt.sign({userId: user.id},secret);
		 res.status(201).json({...user,token});
		})
	   .catch(err=>{
		console.log(err);
		res.status(500).end();
	})});
}

exports.list = (req,res,next) => {
	const db = req.app.get('db');
	db.users.find()
		.then(users=>res.status(200).json(users))
		.catch(err=>res.status(500).end());
}


exports.getById = (req,res,next) => {
	const db = req.app.get('db');
	const {userid} = req.params;
	db.users.findOne({'id':userid})
		.then(user=>res.status(200).json(user))
		.catch(err=>res.status(500).end())
}

exports.getProfile = (req,res,next) => {
	const db = req.app.get('db');
	let {userid} = req.params;
	let userId = userid;
	db.user_profiles.findOne({userId})
		.then(profile=>res.status(200).json(profile))
		.catch(err=>res.status(500).end());
}
