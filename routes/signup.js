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
	MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
		assert.equal(null, err);
		//console.log("connected to db");
		if (err) throw err
		var id = req.body.id;   //<fname> : form variable
    	var pwd = req.body.pwd;
		db.collection('user').find({"id":id}).toArray(function (err, result) {
			if (!result[0]){
				db.collection('user').insert({"id":id,"pwd":pwd,"seq":0,"todos":[]}, function (err, result) {
					if (err){
						throw err;
						//res.send(err);
					}
					else{
						res.redirect('/notes?id='+id);
					}
		   		});
			}else if(err){
				throw err;
				//res.send(err);
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
