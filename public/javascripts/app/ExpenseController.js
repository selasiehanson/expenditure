function ExpenseCtrl($scope, Expense, $http, helper){

	var format = "dd-mm-yyyy";
	var pDate = $("#dp3").find("input");
	$("#dp3").datepicker({
		format : format
	});
	

	window.sc = $scope;
	$scope.expenses = [];
	
	function getExpenses(){
		Expense.query(function (res){
			$scope.expenses = res;
			$scope.sampleProductCategories = angular.copy(res);
		});	
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
		if (newExpense["_id"]){
			newExpense["id"] = newExpense["_id"];
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
		//var expense = $scope.expenses[index];
		if(!$scope.itemToEdit){
			alert("Please select a row to delete");
			return;
		}
			
		var expense = $scope.itemToEdit;
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
	$scope.itemEdit =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to edit");
			return;
		}

		var expense = $scope.itemToEdit;
		console.log(expense.purchasedDate)
		var date = helper.formatDate(format,expense.purchasedDate);
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
		var today  = helper.formatDate(format,new Date());
		pDate.val(today);
	}

	$scope.clear();
	getExpenses();
	getItems();
	$scope.todaysDate();

    $scope.myCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {            
        $(nRow).bind('click', function() {
        	// $(this).addClass('row_selected');
         //    $scope.$apply(function() {
         //        $scope.someClickHandler(aData);
         //    });
        	window.tt = $(this);
            if ( $(this).hasClass('row_selected') ) {
	            $(this).removeClass('row_selected');
	            $scope.$apply(function() {
	                $scope.someClickHandler(null);
	            });
	        }
	        else {
	            $(this).parents("table").find("tr").removeClass("row_selected")
	            $(this).addClass('row_selected');
	            $scope.$apply(function() {
	                $scope.someClickHandler(aData);
	            });
	        }
	    });
        return nRow;
    };

    $scope.someClickHandler = function(data) {
    	console.log(data)
        $scope.itemToEdit = data;
    };

	$scope.columnDefs = [
		{ "bSortable": false, "aTargets": [ 0 ] } ,
        { "mDataProp": "item.name", "aTargets":[1]},
        { "mDataProp": "quantity", "aTargets":[2] },
        { "mDataProp": "item.unit", "aTargets":[3] },
        { "mDataProp": "price", "aTargets":[4] }
    ]; 

}