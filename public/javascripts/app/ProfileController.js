function ProfileCtrl($scope, $http){
	$scope.userName = ""
	$http.get('/profile').success(function(res){
		$scope.userName = res.userName;
	});
}