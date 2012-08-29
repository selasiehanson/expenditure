function UserCtrl($scope, User){

	window.ex = User;
	$scope.users = [];
	var dt = null;

	function getUsers(){
		User.query(function (res){
			$scope.users = angular.copy(res);
		});	
	}
	
	$scope.totalUser = function (){
		var total = 0;

		$scope.users.forEach(function (n){
			total += n.price;
		});

		return total;
	}

	$scope.addUser =  function (newUser){
		if (newUser["_id"]){
			newUser["id"] =  newUser["_id"];
			User.update(newUser, function (){
				getUsers();
				$scope.clear();
			});
			
		}else {
			var user =  angular.copy(newUser);
			var theUser = new User(user);
			theUser.$save(function (){
				//fetch fresh items
				getUsers();
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

		var user = $scope.itemToEdit;
		user["id"] = user["_id"];
		var _exp =  new User(user);
		_exp.$delete(function (){
			getUsers()
		});
	}

	/**
	 * Prepare the item for editing by making a copy that way 
	 * it is not bound enabling us to save on the server before
	 * refreshing the grid
	 * @param  {Object} user [the object to be edited]
	 * @return {[type]}
	 */
	$scope.itemEdit =  function (){
		if(!$scope.itemToEdit){
			alert("Please select a row to edit");
			return;
		}

		$scope.newUser = angular.copy($scope.itemToEdit);
		$scope.title = "Update User";
		$scope.statusText = "Update User";
	}

	$scope.clear =  function (){
		$scope.newUser = {};
		$scope.title = "Add New User";
		$scope.statusText = "Add User";
	}

	$scope.clear();
	getUsers();

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
        { "mDataProp": "firstName", "aTargets":[0]},
        { "mDataProp": "lastName", "aTargets":[1] },
        { "mDataProp": "userName", "aTargets":[2] }
    ]; 
}