var users =  module.exports.users = [
	{userName : "admin", password : "admin" , firstName : 'selasie', lastName :"Hanson"},
	{userName : "kojo", password : "kojo" , firstName : 'kojo', lastName :"kojo"}
];

var findUser = function (login){
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
	var user = findUser(login);
	if(!user){
		callback(null)
		return
	}

	if(user.password=== password){
		callback(user);
		return
	}

	callback(null);
}