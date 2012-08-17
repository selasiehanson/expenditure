var main = angular.module('expenditure',['expenseServices']).config(["$routeProvider", function ($routeProvider){
	$routeProvider.when('/expenses', {
		templateUrl : 'partials/expenses.html' , controller : ExpenseCtrl
	}).when('/units', {
		templateUrl : 'partials/units.html' , controller : ExpenseCtrl
	}).
	when('/currencies', {
		templateUrl : 'partials/currencies.html' , controller : ExpenseCtrl
	}).
	when('/users', {
		templateUrl : 'partials/users.html' , controller : ExpenseCtrl
	}).otherwise({redirectTo: '/expenses'});
}]);