function ExpenseCtrl($scope, Expense, $http, helper){

	var format = "dd-mm-yyyy";
	var pDate = $("#dp3").find("input");
	$("#dp3").datepicker({
		format : format
	});
	

	window.sc = $scope;
	$scope.expenses = [];
	
	function getExpenses(){
		$scope.expenses = Expense.query()	
	}
	
	function getItems(){
		$http.get('/items').success(function(res){
			$scope.items = res;
		});
	}
	$scope.totalExpense = function (){
		var total = 0;

		$scope.expenses.forEach(function (n){
			total += n.price;
		});

		return total;
	}

	$scope.addExpense =  function (newExpense){
		var date = pDate.val();
		newExpense.purchasedDate = date;
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
		expense["id"] =  expense["_id"];
		var _exp =  new Expense(expense);
		_exp.$delete(function (){
			getExpenses();
		});
	}

	/**
	 * Prepare the item for editing by making a copy that way 
	 * it is not bound enabling us to save on the server before
	 * refreshing the grid
	 * @param  {Object} expense [the object to be edited]
	 * @return {[type]}
	 */
	$scope.itemEdit =  function (expense, $index){
		console.log(expense.purchasedDate)
		var date = helper.formartDate(format,expense.purchasedDate);
		pDate.val(date.toString());
		$scope.newExpense = angular.copy( expense );
		var itemIndex =  helper.getSelectIndex(expense.item, $scope.items);
		$scope.newExpense.item = $scope.items[itemIndex];

		$scope.statusText = "Update Expense";
		$scope.title = "Update Expense";
	}

	$scope.clear =  function (){
		$scope.newExpense = {};
		$scope.statusText = "Add Expense";
		$scope.title = "Add New Expense";
		$scope.todaysDate()
	}

	$scope.todaysDate =  function (){
		var today  = helper.formartDate(format,new Date());
		pDate.val(today);
	}

	$scope.clear();
	getExpenses();
	getItems();
	$scope.todaysDate();

}