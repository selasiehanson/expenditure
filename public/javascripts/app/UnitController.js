function UnitCtrl($scope, Unit){

	window.ex = Unit;
	$scope.units = [];
	
	function getUnits(){
		Unit.query(function (res){
			$scope.units = angular.copy(res);
		});
	}
	
	$scope.addUnit =  function (newUnit){
		
		if (newUnit["_id"]){
			newUnit["id"] =  newUnit["_id"];
			newUnit["desccription"] = newUnit["desccription"] || " ";
			Unit.update(newUnit, function (){
				getUnits();
				$scope.clear();
			});
			
		}else {
			var unit =  angular.copy(newUnit);
			unit["desccription"] = unit["desccription"] || " ";
			var theUnit = new Unit(unit);
			theUnit.$save(function (){
				//fetch fresh items
				getUnits();
				$scope.clear();
			});
		}
	};

	/**
	 * itemRemove removes an item from the collection
	 * @param  {int} index 
	 */
	$scope.itemRemove =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to delete");
			return;
		}

		var unit = $scope.itemToEdit;
		unit["id"] = unit["_id"];
		var _unit =  new Unit(unit);
		_unit.$delete(function (){
			getUnits()
		});
	}

	/**
	 * Prepare the item for editing by making a copy that way 
	 * it is not bound enabling us to save on the server before
	 * refreshing the grid
	 * @param  {Object} unit [the object to be edited]
	 * @return {[type]}
	 */
	$scope.itemEdit =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to edit");
			return;
		}
		
		$scope.newUnit = angular.copy($scope.itemToEdit);
		$scope.title = "Update Unit";
		$scope.statusText = "Update Unit";
	}

	$scope.clear =  function (){
		$scope.newUnit = {};
		$scope.title = "Add New Unit";
		$scope.statusText = "Add Unit";
	}

	$scope.clear();
	getUnits();

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
        { "mDataProp": "symbol", "aTargets":[1] },
        { "mDataProp": "description", "aTargets":[2] }
    ]; 
}