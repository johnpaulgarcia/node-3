exports.createUser = (req,res,next) => {
	let {email,password} = req.body;
	const db = req.app.get('db');
	db.users.insert({
		    email,
		    password,
		    user_profiles: 
			   [
			    {
				userid: undefined,
				about: null,
				thumbnail: null,
			     }
			  ]
		},{deepInsert: true,})
	   .then(user=>res.status(201).json(user))
	   .catch(err=>res.status(500).end());
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
	db.users.findOne(userid)
		.then(user=>res.status(200).json(user))
		.catch(err=>res.status(500).end())
}

exports.getProfile = (req,res,next) => {
	const db = req.app.get('db');
	let {userid} = req.params;
 	db.user_profiles.findOne(userid)
		.then(profile=>res.status(200).json(profile))
		.catch(err=>res.status(500).end());
}
