function CategoryCtrl ($scope, Category){

	$scope.categories = [];
	
	function getCategories(){
		Category.query(function (res){
			$scope.categories = angular.copy(res);
		});	
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
	$scope.itemRemove =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to delete");
			return;
		}

		var category = $scope.itemToEdit;
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
	$scope.itemEdit =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to edit");
			return;
		}

		$scope.newCategory = angular.copy($scope.itemToEdit);
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
        { "mDataProp": "description", "aTargets":[1] }
    ]; 
}