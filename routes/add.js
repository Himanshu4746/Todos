var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET signup page. */
router.get('/', function(req, res, next) {
	res.render('add', { title: 'add'});
});

//POST data
router.post('/', function(req, res, next) {
 	var MongoClient = require('mongodb').MongoClient,assert=require('assert');
 	//MongoClient.connect('mongodb://localhost:27017/todo', function (err, db) {
 	MongoClient.connect('mongodb://himanshu4746:qwe123@ds129030.mlab.com:29030/todo',{authMechanism: 'SCRAM-SHA-1'}, function (err, db) {
 		assert.equal(null, err);
		if (err) throw err;
		var title = req.body.Title;
  		var desc = req.body.Description;
  		var items=[];
  		if(Array.isArray(req.body.Item))
  			for(var i=0;i<req.body.Item.length;i++)
  			{	items.push({
		        	"item" : req.body.Item[i],
	            	"completed" : 0,
	            	"i_id": i
		    	});

  			}
  		else
  			items.push({
		        "item" : req.body.Item,
	            "completed" : 0,
	            "i_id": 0
		    });
  		var id = req.session.user;
		db.collection('user').findOneAndUpdate(
          	{ "id": id },
            { $inc: { seq: 1 } },
            { 
		      "upsert": true,
		      "returnOriginal": true
		    },function (err, result) {
           		console.log(result);
			if (!result){
				res.redirect('/signup');
			 }else if(err){
			 	throw err;
				res.send("error!");
			}
			else{
				var id = req.session.user;
				var l_id = result.value.seq+1;
				db.collection('user').update({"id":id},{$push:{
					"todos":{
		                "title" : title,
		                "description" : desc,
		                "l_id": l_id,
		                "list" : items
		            }
	            }},{upsert:true}, function (err, result) {
					if (err){ 
						throw err;
						//res.send(err);
					}
					else{
						//res.redirect('/notes?id=sonal');
						res.redirect('/notes');

					}
		   		},false,true);
			}
	   	});
	});
});

module.exports = router;
