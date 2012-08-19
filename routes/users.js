var usersModule =  require("../lib/users");

exports.getUsers = function(req, res){
	res.send(usersModule.users)	;
}

exports.getUser = function (req, res){

}

exports.createUsers = function(req, res){

}

exports.updateUser = function (req, res){

}

exports.deleteUser = function (req,res){

}