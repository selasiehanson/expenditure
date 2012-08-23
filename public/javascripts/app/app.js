var main = angular.module('expenditure',['expenseServices', 'myHelpers']).config(["$routeProvider", function ($routeProvider){
	$routeProvider.when('/expenses', {
		templateUrl : 'partials/expenses.html' , controller : ExpenseCtrl
	}).when('/units', {
		templateUrl : 'partials/units.html' , controller : ExpenseCtrl
	}).
	when('/items', {
		templateUrl : 'partials/items.html' , controller : ItemCtrl
	}).
	when('/categories', {
		templateUrl : 'partials/categories.html' , controller : ItemCtrl
	}).
	when('/users', {
		templateUrl : 'partials/users.html' , controller : ExpenseCtrl
	}).otherwise({redirectTo: '/expenses'});
}]);