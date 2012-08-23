var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ItemSchema = new Schema ({
	name : String,
	category : {
		name : String,
		_id : ObjectId
	},
	unit : {
		name : String,
		_id : ObjectId
	},
	created_on : Date,
	updated_at : Date
});

module.exports = mongoose.model("Items",ItemSchema);
