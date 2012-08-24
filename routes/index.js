var mongoose = require("mongoose");
var Expense = require("../models/expense");

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index.html');
};


//returns all expenses as an array
exports.getExpenses =  function (res, res){
	Expense.find({}, function (err, docs){
		res.send(docs);
	});
};

//return the expense with a specific id
exports.getExpense =  function(req, res){
	var id = req.params["id"];
	var expense = expenses.filter (function (n){
	  return n["id"] == id;
	});

	res.send(expense[0]);
};

//add a new expense to the collection
exports.createExpense = function (req, res){
	var _in  = req.body;
	console.log(_in);
	var params = {};
	var date =  new Date();

	params.name = _in.name;
	
	params.purchasedDate = _in.purchasedDate;
	params.price = _in.price;
	params.quantity = _in.quantity;
	params.item = {
		_id : _in.item._id,
		name : _in.item.name,
		unit : _in.item.unit.name
	};
	params.created_on = date;
	params.updated_on = date;

	console.log(params);
	var expense = new Expense(params);
	expense.save(function (err, doc){
		if (err)
			console.log(err);
		res.send({
			message : "Expense created successfully"
		});
	});
};


exports.updateExpense =  function (req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	var _in = req.body;
	var params  = {}
	
	params.name = _in.name;
	
	params.purchasedDate = _in.purchasedDate;
	params.price = _in.price;
	params.quantity = _in.quantity;
	params.item = {
		_id : _in.item._id,
		name : _in.item.name,
		unit : _in.item.unit.name
	};
	
	params.updated_on = new Date();
	
	Expense.findByIdAndUpdate(id,params, function (err, doc){
		if(!err)
			res.send({message: "Expense updated sucessfully"});
		else
			console.log(err)
	});

};

//delete an epense object from the list of expenses
exports.deleteExpense =  function (req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	Expense.findByIdAndRemove(id, function (err){
		//todo : check for error
		res.send("Expense deleted.")
	});
};
