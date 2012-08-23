var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
	name : String,
	description : String ,
	created_on : Date,
	updated_at : Date
});

module.exports = mongoose.model("Category",CategorySchema);
