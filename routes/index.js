var express = require('express');
var router = express.Router();
//session
var session = require('express-session');

// GET home page
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Login'});
});

//POST data
router.post('/', function(req, res, next) {
	var MongoClient = require('mongodb').MongoClient;
	//To connect using a driver via the standard MongoDB URI
	MongoClient.connect('mongodb://<user>:<pass>@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
		if (err) throw err
		var id = req.body.id;   //<id>: form form var
    	var pwd = req.body.pwd;
		db.collection('user').find({"id":id,"pwd":pwd}).toArray(function (err, result) {
			if (!result[0]){
				//throw err;
				res.redirect('/signup');
			 }else if(err){
			 	throw err;
				res.send("error!");
			}
			else{
				req.session.user = req.body.id;
				res.redirect('/notes');
			}
	   	});
	});
});

module.exports = router;