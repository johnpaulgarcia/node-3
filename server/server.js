const express = require('express');
const massive = require('massive');
const router = require('./routes');
const PORT = 12345;
const massivePORT = 5432;
const HOST = '127.0.0.1';
massive({
	host: HOST,
	port: massivePORT,
	database: 'node3',
	user: 'postgres',
	password: 'node3db',
}).then(db=>{
	
	const app = express();
	app.set('db',db);
	app.use(express.json());
	app.use(router);
	app.listen(PORT,HOST,()=>console.log(`Api running hot on ${HOST}:${PORT}`))

});
