function ExpenseCtrl($scope, Expense){

	$("#purchasedDate").datepicker({
		format : "dd-mm-yyyy"
	})
	
	window.ex = Expense;
	$scope.expenses = [];
	
	// $http.get('/expenses').success(function(data) {
	//     $scope.expenses = data;
	// });

	
	function getExpenses(){
		$scope.expenses = Expense.query()	
	}
	
	$scope.totalExpense = function (){
		var total = 0;

		$scope.expenses.forEach(function (n){
			total += n.price;
		});

		return total;
	}

	$scope.addExpense =  function (newExpense){
		var expense = {
			item : newExpense.item,
			unit : newExpense.unit,
			quantity : newExpense.quantity,
			price : newExpense.price,
			purchasedDate : newExpense.purchasedDate,
			currency : "GhC"
		}
		var _exp = new Expense(expense);
		_exp.$save(function (){
			//fetch fresh items
			getExpenses();
		});
		newExpense = {};
	}

	$scope.itemRemove =  function (index){
		var expense = $scope.expenses[index];
		console.log(expense)
		var _exp =  new Expense(expense);
		_exp.$delete(function (){
			getExpenses()
		});
		// Expense.remove({ id : expense:id});
	}

	$scope.itemEdit =  function (expense){
		$scope.newExpense = expense
	}

	$scope.clear =  function (){
		$scope.newExpense = {};
	}

	window.x = $scope
	getExpenses();

}