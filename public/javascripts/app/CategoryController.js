function CategoryCtrl ($scope, Category){

	$scope.categories = [];
	
	function getCategories(){
		$scope.categories = Category.query()	
	}

	$scope.addCategory =  function (newCategory){
		console.log("clikec")
		if (newCategory["_id"]){
			newCategory["id"] =  newCategory["_id"];
			newCategory["desccription"] = newCategory["desccription"] || " ";
			Category.update(newCategory, function (){
				getCategories();
				$scope.clear();
			});
			
		}else {
			var category =  angular.copy(newCategory);
			category["desccription"] = category["desccription"] || " ";
			var theCategory = new Category(category);
			theCategory.$save(function (){
				//fetch fresh items
				getCategories();
				$scope.clear();
			});
		}
	}

	/**
	 * itemRemove removes an item from the collection
	 * @param  {int} index 
	 */
	$scope.itemRemove =  function (index){
		var category = $scope.categories[index];
		category["id"] = category["_id"];
		var _category =  new Category(category);
		_category.$delete(function (){
			getCategories()
		});
	}

	/**
	 * Prepare the item for editing by making a copy that way 
	 * it is not bound enabling us to save on the server before
	 * refreshing the grid
	 * @param  {Object} category [the object to be edited]
	 * @return {[type]}
	 */
	$scope.itemEdit =  function (category){
		$scope.newCategory = angular.copy(category);
		$scope.title = "Update Category";
		$scope.statusText = "Update Category";
	}

	$scope.clear =  function (){
		$scope.newCategory = {};
		$scope.title = "Add New Category";
		$scope.statusText = "Add Category";
	}

	$scope.clear();
	getCategories();

}