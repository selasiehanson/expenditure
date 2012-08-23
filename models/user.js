var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	firstName : String ,
	lastName : String ,
	userName : String ,
	password : String ,
	salt : String,
	created_on : Date,
	updated_at : Date
	//role_id : ObjectId to be used later
});
UserSchema.virtual('id')
  .get(function () {
    return this._id.toHexString();
  });

module.exports = mongoose.model("Users",UserSchema);
