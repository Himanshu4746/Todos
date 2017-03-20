var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	var MongoClient = require('mongodb').MongoClient,assert=require('assert');
	//MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
	//To connect using a driver via the standard MongoDB URI
	MongoClient.connect('mongodb://himanshu4746:qwe123@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
		if (err) throw err ;
    	var id = req.session.user;
		db.collection('user').find({"id":id}).toArray(function (err, result) {
			if (err) throw err
			res.render('notes', { 
				title:"notes",
				"d":result[0]
			});
	   	});
	});
});

router.post('/:state',function(req, res, next){
	if(req.params.state){
		switch(req.params.state){
		case "0":
			if(req.body.index && req.body.iid)
			{
				var MongoClient = require('mongodb').MongoClient,assert=require('assert');	
				//MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
				//To connect using a driver via the standard MongoDB URI
				MongoClient.connect('mongodb://himanshu4746:qwe123@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
					if (err) throw err ;
					var object={};
					for(var i=0;i<req.body.iid.length;i++){
						var z=req.body["ch-"+req.body.index+"-"+req.body.iid[i].toString()]=="0"?1:0;	
						object["todos."+req.body.index+".list."+req.body.iid[i]+".completed"]=z;
					}
					var ID = req.session.user;
					db.collection('user').update({"id":ID},{
						$set:object
			  		},function (err, result) {
						if (err) throw err;
			   		},false,true);	
				});
			}
			res.redirect('/notes');
			break;
		case "1":
			if(req.body.lid)
			{
				var MongoClient = require('mongodb').MongoClient,assert=require('assert');	
				object={"todos":{}}
				object.todos["l_id"]=parseInt(req.body.lid);
				//To connect using a driver via the standard MongoDB URI
				MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
					if (err) throw err ;
					var ID = req.session.user;
					db.collection('user').update({"id":ID},{$pull:object
		            }, function (err, result) {
						if (err){ 
							throw err;
						}
			   		});	
				});
			}
			res.redirect('/notes');
			break;
		}
	}
});

module.exports = router;