var express = require('express');
var router = express.Router();

//for session
//var parseurl = require('parseurl')
var session = require('express-session');
var sess;

// GET home page
router.get('/', function(req, res, next) {
	sess = req.session;
	console.log(sess);
	res.render('index', { title: 'Login'});
/*	var MongoClient = require('mongodb').MongoClient;
 	
	MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
		if (err) throw err
		//db.collection('todos').insert({fname:"himanshu",lname:"kumar"});
		db.collection('user').find({"id": "himanshu"}).toArray(function (err, result) {
			if (err) throw err
			console.log(result);
			//using url query  http://localhost:3000/?img=abcd&net=xyz
			//console.log(req.query.img,req.query.net);
			res.render('index', { title: 'Himanshu'});
	   	});
	}); */
});

//POST data
router.post('/', function(req, res, next) {
	console.log(req.body);
	//req.session.user = req.body.id;
	//console.log(req.session.user);
	var MongoClient = require('mongodb').MongoClient;
	//MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
	MongoClient.connect('mongodb://himanshu4746:qwe123@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
		console.log("connected to db");
		if (err) throw err
		var id = req.body.id;   //<fname> : form variable
    	var pwd = req.body.pwd;
		db.collection('user').find({"id":id,"pwd":pwd}).toArray(function (err, result) {
			if (!result[0]){
				//throw err;
				//res.send("error!");
				res.redirect('/signup');
			 }else if(err){
			 	throw err;
				res.send("error!");
			}
			else{
				res.redirect('/notes?id='+id);
			}
			//console.log(result);
			//using url query  http://localhost:3000/?img=abcd&net=xyz
			//console.log(req.query.img,req.query.net);
	   	});
	});
});

module.exports = router;