var mongoose = require("mongoose");
var User = require("../models/user");

exports.getUsers = function(req, res){
	User.find({},{id: 1, userName : 1, firstName : 1, lastName : 1},function(err, docs){
		res.send(docs);
	});
}

exports.getUser = function (req, res){
	
}

exports.createUser = function(req, res){
	//todo: hash password 
	var params  = {}
	var _in = req.body; 
	var date = new Date();
	params.firstName = _in.firstName;
	params.lastName = _in.lastName;
	params.userName = _in.userName;
	params.password = _in.password;
	params.created_on = date;
	params.updated_on = date;

	var user =  new User(params);
	user.save(function (err){
		res.send({
			message : 'User created sucessfully'
		});
	});
}

exports.updateUser = function (req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	var _inc = req.body;
	var params  = {}
	//do not allow password change here
	//will be done through a seperate inteface
	
	params.firstName = _inc.firstName;
	params.lastName = _inc.lastName;
	params.userName = _inc.userName;
	params.updated_at = new Date();
	User.findByIdAndUpdate(id,params, function (err, doc){
		if(!err)
			res.send({message: "User updated sucessfully"});
	});
	
}

exports.deleteUser = function (req,res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	User.findByIdAndRemove(id, function (err){
		//todo : check for error
		res.send("User deleted.")
	})
}