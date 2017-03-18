var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
	res.render('signup', { title: 'signup'});
});

//POST data
router.post('/', function(req, res, next) {
	console.log(req.body);
 	var MongoClient = require('mongodb').MongoClient,assert=require('assert');
	//MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
	MongoClient.connect('mongodb://himanshu4746:qwe123@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
		assert.equal(null, err);
		console.log(db);
		//if (err) throw err
		var id = req.body.id;   //<fname> : form variable
    	var pwd = req.body.pwd;
		db.collection('user').find({"id":id}).toArray(function (err, result) {
			if (!result[0]){
				//res.send("success!");
				db.collection('user').insert({"id":id,"pwd":pwd,"seq":0,"todos":[]}, function (err, result) {
					if (err){ 
						//throw err;
						res.send("error!");
					}
					else{
						res.redirect('/notes?id='+id);
					}
		   		});
			}else if(err){
				//throw err;
				res.send("error!");
			}
			else{
				//res.send("failure! already exist.");
				res.render('signup', { 
					"title":"signup",
					"msg": 'ID already exists!'

				});
			}
	   	});
	});
});

module.exports = router;
