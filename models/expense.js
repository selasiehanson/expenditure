var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ExpenseSchema = new Schema ({
	quantity : Number,
	price : Number,
	purchasedDate : Date, 
	item : {
		_id : ObjectId,
		name : String,
		unit : String,
		unitId : ObjectId
	},
	created_on : Date,
	updated_at : Date
});

module.exports = mongoose.model("Expenses",ExpenseSchema);
