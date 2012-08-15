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
			currency : "GhC"
		}
		var _exp = new Expense(expense);
		_exp.$save(function (){
			//fetch fresh items
			getExpenses();
		})
		newExpense = {};
	}

	$scope.itemRemove =  function (index){
		$scope.expenses.splice(index, 1);
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