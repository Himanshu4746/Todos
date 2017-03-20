var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET signup page. */
router.get('/', function(req, res, next) {
	res.render('signup', { title: 'signup'});
});

//POST data
router.post('/', function(req, res, next) {
 	var MongoClient = require('mongodb').MongoClient,assert=require('assert');
	//MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
	//To connect using a driver via the standard MongoDB URI
	MongoClient.connect('mongodb://himanshu4746:qwe123@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
		assert.equal(null, err);
		//if (err) throw err
		var id = req.body.id;
    	var pwd = req.body.pwd;
		db.collection('user').find({"id":id}).toArray(function (err, result) {
			if (!result[0]){
				db.collection('user').insert({"id":id,"pwd":pwd,"seq":0,"todos":[]}, function (err, result) {
					if (err){ 
						throw err;
					}
					else{
						req.session.user = req.body.id;
						res.redirect('/notes');
					}
		   		});
			}else if(err){
				throw err;
			}
			else{
				res.render('signup', { 
					"title":"signup",
					"msg": 'ID already exists!'
				});
			}
	   	});
	});
});

module.exports = router;
