function ExpenseCtrl($scope, Expense, $http, helper, $filter){

	//this corresponds to the dd-mm-yyyyy. Angular expects the 
	//month to be MM and not mm 
	
	var format = "dd-MM-yyyy"; 

	var pDate = $("#dp3").find("input");
	$("#dp3").datepicker({
		format : "dd-mm-yyyy"
	});
	

	window.sc = $scope;
	$scope.expenses = [];
	
	function getExpenses(){
		Expense.query(function (res){
			$scope.expenses = angular.copy(res);
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
	$scope.itemRemove =  function (){
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
		
		$scope.newExpense = angular.copy( expense );
		var itemIndex =  helper.getSelectIndex(expense.item, $scope.items);
		$scope.newExpense.item = $scope.items[itemIndex];
		console.log("purchasedDate before " + $scope.newExpense.purchasedDate)
		var date = new Date($scope.newExpense.purchasedDate);
		$scope.newExpense.purchasedDate = $filter('date')(date, format);
		//pDate.val(date);
		console.log("purchasedDate after " + $scope.newExpense.purchasedDate)
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
		var today = $filter('date')(new Date(), format)
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
		// { "bSortable": false, "aTargets": [ 0 ] } ,
        { "mDataProp": "item.name", "aTargets":[0]},
        {
        	"mDataProp": "quantity", 
        	"aTargets":[1] , 
        	// "fnRender": function ( oObj, sVal ) {
         //           return "<span class='badge badge-success'>"+ sVal+"</span>";
         //    },
        },
        { "mDataProp": "item.unit", "aTargets":[2] },
        { 
        	"mDataProp": "price", 
        	"aTargets":[3] ,
        	// "fnRender": function ( oObj, sVal ) {
        	// 	// console.log(oObj)
        	// 	var x = angular.copy(sVal)
         //        return "<span class='badge badge-success'>"+ x +"</span>";
         //    },
        }
    ]; 

}