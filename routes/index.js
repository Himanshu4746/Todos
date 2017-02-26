var express = require('express');
var router = express.Router();
//var parseurl = require('parseurl')
//session
var session = require('express-session');
var sess;

// GET home page
router.get('/', function(req, res, next) {
	sess = req.session;
	console.log(sess);
	res.render('index', { title: 'Login'});
});

//POST data
router.post('/', function(req, res, next) {
	console.log(req.body);
	req.session.user = req.body.id;
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
		console.log("connected to db");
		if (err) throw err
		var id = req.body.id;   //<fname> : form variable
    	var pwd = req.body.pwd;
		db.collection('user').find({"id":id,"pwd":pwd}).toArray(function (err, result) {
			if (!result[0]){
				//throw err;
				//res.send(err);
				res.redirect('/signup');
			 }else if(err){
			 	throw err;
				//res.send(err);
			}
			else{
				//to be replaced
				res.redirect('/notes?id='+id);
			}
	   	});
	});
});

module.exports = router;
