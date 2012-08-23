var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnitSchema = new Schema ({
	name : String,
	symbol : String,
	description : String ,
	created_on : Date,
	updated_at : Date
});

module.exports = mongoose.model("Units",UnitSchema);
