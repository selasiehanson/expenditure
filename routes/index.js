
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};


var expenses = [
	{id: 1, item : "Bread", unit : 'loaf', quantity : 2, price : 6, currency: "GhC", purchasedDate : new Date()},
	{id: 2, item : "Malt", unit : 'crate', quantity : 1, price : 24, currency: "GhC", purchasedDate : new Date()},
	{id: 3, item : "Paper", unit : 'box', quantity : 2, price : 30, currency: "GhC", purchasedDate : new Date()},
	{id: 4, item : "Lunch", unit : 'paper packs', quantity : 7, price : 70, currency: "GhC", purchasedDate : new Date()},
];

//returns all expenses as an array
exports.getExpenses =  function (res, res){
		
	res.send(expenses);
}

//return the expense with a specific id
exports.getExpense =  function(req, res){
	var id = req.params["id"];
	var expense = expenses.filter(function (n){
	  return n["id"] == id;
	});

	res.send(expense[0])
}

//add a new expense to the collection
exports.addExpense = function (req, res){
	//try cleaning up first
	var e = req.body;
	e["id"] = expenses.length;
	expenses.push(e);
	res.send(req.body)
}

//delete an epense object from the list of expenses
exports.deleteExpense =  function (req, res){
	var id =  req.params["id"];
	var currentIndex = -1;
	expenses.filter(function (n){
		if(n["id"] == id){
			currentIndex =  expenses.indexOf(n);
		}
	});

	if(currentIndex > -1){
		expenses.splice(currentIndex, 1);
		res.send("Expense Deleted")
	}else {
		res.send("No such entry exists for deletion")
	}

	
}