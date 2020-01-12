"use strict";
//requirements
	const express = require('express');
	const app = require('express')();
	const compression = require('compression');
//config
	const port = process.env.PORT || 8080;
	app.use(compression());
	app.use(express.static(__dirname + '/public/'));
//create server
	const server = require('http').createServer(app);
	const io = require('socket.io').listen(server);
//database
	//mongodb
	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://jglvega_r_w:Facebuke18A@registronc-qxao5.mongodb.net/test?retryWrites=true";
	const client = new MongoClient(uri, { useNewUrlParser: true, keepAlive: 1, connectTimeoutMS: 30000 });


//socket.io fucntions
	io.on('connection', (socket) => {
		console.log('usuario ' + socket.id);
		socket.on('queryDB', () => {
			client.connect((err, db)=>{
				if (err) throw err;
				var dbo = db.db('registroNCcasas');
				dbo.collection('casas').find().toArray((err, result) => {
					if (err) throw err;
					io.emit('database', result);
				});
			});
		});
		socket.on('updateData', (data) =>{
			var ndata = {$set: {"estado":`${data.estado}`, "notas":`${data.notas}`}};
			var query = {id:`${data.id}`};
			client.connect((err, db)=>{
				if (err) throw err;
				var dbo = db.db('registroNCcasas');
				//hace la actualizacion
				dbo.collection('casas').updateOne(query, ndata, function(err, res) {
					if (err) throw err;
					console.log("1 document updated");
					io.emit('deleteNDB', data);
				});
				//envia los datos
				dbo.collection('casas').find().toArray((err, result) => {
					if (err) throw err;
					io.emit('database', result);
				});
			});
			console.log(data);
		});
	});
//routes
	app.get('/', (req, res) => {
		var expressOptions = {root: __dirname + '/public/'}
		res
			.status(200)
			.sendFile('index.html', expressOptions)
	})
//listen server
server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(port)
	}
});