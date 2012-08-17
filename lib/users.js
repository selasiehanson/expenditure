var users = {
	"admin"  : {login : "admin" , password : "admin"} 
}

//authentication must later on be done against a hash function
module.exports.authenticate =  function (login, password,callback){
	var user = users[login];
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