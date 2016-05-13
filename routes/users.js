var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/balram1');
var mongo = require('mongodb');



/* GET users listing. */
router.get('/add', function(req, res, next) {
	var b=(parseInt(req.query.num1)+parseInt(req.query.num2));
  res.send('respond with a resource   '+ b);
});
router.get('/balram', function(req, res, next) {
  res.send('Balram Pandey');
});
router.get('/bp', function(req, res, next) {
  res.send('bp');
});
router.get('/brp', function(req, res, next) {
  res.send('brp');
});
router.post('/post', function(req, res){
	
	 var name = req.body.name;
	 var email = req.body.email;
  console.log(name+email);
			res.json({ message: 'Success', 
				name:name,
				email:email
			});
		
   // res.send('Success'+req.bady.name+req.body.email);

});
router.get('/userlist', function(req, res) {
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});
router.post('/adduser', function(req, res) {
  var collection = db.get('userlist');
  collection.insert(req.body, function(err,result){
    res.send(
      (err === null) ? {msg: 'Success'} : {msg: err}
    );
  });
}); 
router.get('/user/',function(req,res){
  var collection = db.get('userlist');
    console.log("result"+req.query.username);
    var userName=req.query.username;
    collection.find({"username": req.query.username},function(err, doc) {
                 console.log(doc);

        if (doc){
            res.json(doc);
        } else {
            res.json({msg: 'Error'});
        }
    });
});
module.exports = router;
