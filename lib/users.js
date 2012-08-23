var Users = require("../models/user");

// var user =  new Users({
// 	password : "admin",
// 	firstName : "Admin",
// 	lastName : 'admin',
// 	userName : 'admin'
	
// });
// user.save(function (){
// 	console.log("saved ")
// })


var users =  module.exports.users = []
var findUser = function (login){
	//users = User.find()
	//console.log(users)
	var user = users.filter(function (n){
		return n["userName"] == login;
	});

	if(user.length > 0){
		return user[0];	
	}
	return null;
}

//authentication must later on be done against a hash function
module.exports.authenticate =  function (login, password,callback){
	// var user = users[login];
	
	Users.find({userName : login, password: password}, function (err, docs){
		
		if(err)
			console.log(err)
		var user = docs[0];
		
		if(!user){
			callback(null)
			return
		}

		
		callback(user);
		return
		
	});
	//var user = findUser(login);
	
}