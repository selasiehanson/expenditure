var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ExpenseSchema = new Schema ({
	quantity : Number,
	price : Number,
	purchasedDate : Date, 
	item : {
		name : String,
		unit : String,
		_id : ObjectId
	},
	created_on : Date,
	updated_at : Date
});

module.exports = mongoose.model("Expenses",ExpenseSchema);
