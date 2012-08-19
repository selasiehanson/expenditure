function UserCtrl($scope, User){

	window.ex = User;
	$scope.users = [];
	
	function getUsers(){
		$scope.users = User.query()	
	}
	
	$scope.totalUser = function (){
		var total = 0;

		$scope.users.forEach(function (n){
			total += n.price;
		});

		return total;
	}

	$scope.addUser =  function (newUser){
		if (newUser["id"]){
			User.update(newUser, function (){
				getUsers();
				$scope.clear();
			});
			
		}else {
			var user =  angular.copy(newUser);
			var _exp = new User(user);
			_exp.$save(function (){
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
	$scope.itemRemove =  function (index){
		var user = $scope.users[index];
		console.log(user)
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
	$scope.itemEdit =  function (user){
		$scope.newUser = angular.copy(user);
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

}