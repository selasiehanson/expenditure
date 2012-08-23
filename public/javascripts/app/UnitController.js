function UnitCtrl($scope, Unit){

	window.ex = Unit;
	$scope.units = [];
	
	function getUnits(){
		$scope.units = Unit.query();
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
	$scope.itemRemove =  function (index){
		var unit = $scope.units[index];
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
	$scope.itemEdit =  function (unit){
		$scope.newUnit = angular.copy(unit);
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

}