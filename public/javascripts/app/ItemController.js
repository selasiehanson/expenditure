function ItemCtrl($scope, Item , $http, helper){

	window.ex = Item;
	$scope.items = [];
	
	function updateUnits(){
		console.log("updating units")
	}
	
	function getItems(){
		Item.query(function (res){
			$scope.items = angular.copy(res);
		});	
	}
	
	function getUnits(){
		$http.get('/units').success(function (res){
			$scope.units = res;
		});
	}

	function getCategories(){
		$http.get('/categories').success(function (res){
			$scope.categories = res;
		});
	}

	$scope.addItem =  function (newItem){
		if (newItem["_id"]){
			newItem["id"] =  newItem["_id"];
			Item.update(newItem, function (){
				getItems();
				$scope.clear();
			});
			
		}else {
			var item =  angular.copy(newItem);
			var theItem = new Item(item);
			theItem.$save(function (){
				//fetch fresh items
				getItems();
				$scope.clear();
			});
		}
	}

	/**
	 * itemRemove removes an item from the collection
	 * @param  {int} index 
	 */
	$scope.itemRemove =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to delete");
			return;
		}

		var item = $scope.itemToEdit;
		item["id"] = item["_id"];
		var _item =  new Item(item);
		_item.$delete(function (){
			getItems();
		});
	}

	/**
	 * Prepare the item for editing by making a copy that way 
	 * it is not bound enabling us to save on the server before
	 * refreshing the grid
	 * @param  {Object} item [the object to be edited]
	 * @return {[type]}
	 */
	$scope.itemEdit =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to edit");
			return;
		}
		
		var item = $scope.itemToEdit;
		$scope.newItem = angular.copy(item);
		console.log(item)
		var catIndex = helper.getSelectIndex(item.category,$scope.categories);
		
		$scope.newItem.category = $scope.categories[catIndex];
		var unitIndex = helper.getSelectIndex(item.unit, $scope.units);
		$scope.newItem.unit = $scope.units[unitIndex];
		
		$scope.title = "Update Item";
		$scope.statusText = "Update Item";
	}

	$scope.clear =  function (){
		$scope.newItem = {};
		$scope.title = "Add New Item";
		$scope.statusText = "Add Item";
	}
	
	$scope.clear();

	//fetch the following
	getItems();
	getUnits();
	getCategories();

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
        { "mDataProp": "name", "aTargets":[0]},
        { "mDataProp": "unit.name", "aTargets":[1] },
        { "mDataProp": "category.name", "aTargets":[2] }
    ]; 
	

}