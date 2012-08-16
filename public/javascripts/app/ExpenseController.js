function ExpenseCtrl($scope, Expense){

	$("#purchasedDate").datepicker({
		format : "dd-mm-yyyy"
	})
	
	window.ex = Expense;
	$scope.expenses = [];
	
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
		if (newExpense["id"]){
			Expense.update(newExpense, function (){
				getExpenses();
				$scope.clear();
			});
			
		}else {
			var expense =  angular.copy(newExpense);
			var _exp = new Expense(expense);
			_exp.$save(function (){
				//fetch fresh items
				getExpenses();
				$scope.clear();
			});
		}
	}

	/**
	 * itemRemove removes an item from the collection
	 * @param  {int} index 
	 */
	$scope.itemRemove =  function (index){
		var expense = $scope.expenses[index];
		console.log(expense)
		var _exp =  new Expense(expense);
		_exp.$delete(function (){
			getExpenses()
		});
	}

	/**
	 * Prepare the item for editing by making a copy that way 
	 * it is not bound enabling us to save on the server before
	 * refreshing the grid
	 * @param  {Object} expense [the object to be edited]
	 * @return {[type]}
	 */
	$scope.itemEdit =  function (expense){
		$scope.newExpense = angular.copy( expense );
	}

	$scope.clear =  function (){
		$scope.newExpense = {};
	}

	window.x = $scope
	getExpenses();

}