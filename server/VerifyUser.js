const jwt = require('jsonwebtoken');
const secret = require('../secret');

exports.verifyUser = (req,res,next) => {
	if(!req.headers.authorization){return res.status(401).end()}
	try{
	  let token = req.headers.authorization.split(' ')[1];
	  jwt.verify(token,secret);
	  next();
	}catch(err){res.status(401).end()}
}
