const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:Aa123456@192.168.0.56:5432/postgres';
const client = new Client({
    connectionString: connectionString
});
client.connect();
	
var server = express();
server.set('port', process.env.PORT || 4000);

server.post('/api/player', function (req, res) {
	var full_name = req.body.full_name;
    var short_name = req.body.short_name;
    var team = req.body.team;
	
    client.post('Insert into player Values ($1, $2, $3)', [full_name, short_name, team], function (err, result) {
    if (err) {
		console.log(err);
        res.status(400).send(err);
	}
    res.status(200).send(result.rows);
    });
});

server.post('/api/team', function (req, res) {
	var full_name = req.body.full_name;
    var short_name = req.body.short_name;
	var date = new Date();
	var id_stadium = req.body.id_stadium.
	
    client.post('Insert into team Values ($1, $2, $3, $4)', [full_name, short_name, date.getDate(), id_stadium], function (err, result) {
    if (err) {
		console.log(err);
        res.status(400).send(err);
	}
    res.status(200).send(result.rows);
    });
});

server.post('/api/stadium', function (req, res) {
	var full_name = req.body.full_name;
    var short_name = req.body.short_name;
	var capacity = req.body.capacity.
	
    client.post('Insert into stadium Values ($1, $2, $3)', [full_name, short_name, capacity], function (err, result) {
    if (err) {
		console.log(err);
        res.status(400).send(err);
	}
    res.status(200).send(result.rows);
    });
});

server.post('/api/transfer', function (req, res) {
	var origin = req.body.origin;
    var destination = req.body.destination;
	var moment = new Date();
	var player = req.body.player;
	
    client.post('Insert into transfer Values ($1, $2, $3, $4)', [origin, destination, moment, player], function (err, result) {
    if (err) {
		console.log(err);
        res.status(400).send(err);
	}
    res.status(200).send(result.rows);
    });
});


server.get('/api/transfer', (req, res, next) => {
	var id = req.body.id;
	
	    client.get('SELECT * FROM transfer WHERE player = $1 ORDER BY id ASC;', [id], function (err, result) {
    if (err) {
		console.log(err);
        res.status(400).send(err);
	}
    res.status(200).send(result.rows);
    });
	
});

server.listen(4000, function () {
    console.log('Serviço executando.. Porta 4000');
});