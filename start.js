"use strict";
//requirements
	const express = require('express');
	const app = express();
//config
	const port = process.env.PORT || 8080;
	app.use(express.static(__dirname + '/public/'));
//create server
	const server = require('http').createServer(app);
	const io = require('socket.io').listen(server);
//database
	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://jglvega_r_w:Facebuke18A@registronc-qxao5.mongodb.net/test?retryWrites=true";
	const client = new MongoClient(uri, {useNewUrlParser: true, keepAlive: 1, connectTimeoutMS: 30000});
//real time / sockets functions
	io.on('connection', (socket)=>{
		console.log('usuario: ' + socket.id);
		//send a copy of db
		client.connect((err, db)=>{
			if (err) throw err;
			var dbo = db.db('registroNCcasas');
			dbo.collection('casas').find().toArray((err, result) => {
				if (err) throw err;
				io.emit('database', result);
			});
		});
	});
//routes / express
	var expressOptions = {root: __dirname + '/public/'};
	app.get('/', (req, res)=>{
		res.status(200).sendFile('index.html', expressOptions);
	});
	app.get('/draw', (req, res)=>{
		res.status(200).sendFile('draw.html', expressOptions);
	});
//run server
	server.listen(port, console.log(port));
