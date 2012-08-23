function ItemCtrl($scope, Item , $http, helper){

	window.ex = Item;
	$scope.items = [];
	
	function updateUnits(){
		console.log("updating units")
	}
	
	function getItems(){
		$scope.items = Item.query()	
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
	$scope.itemRemove =  function (index){
		var item = $scope.items[index];
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
	$scope.itemEdit =  function (item,$index){
		// console.log($index)
		$scope.newItem = $scope.items[$index];
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

}