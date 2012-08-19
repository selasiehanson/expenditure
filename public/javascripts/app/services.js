angular.module('expenseServices', ['ngResource']).
    factory('Expense', function($resource){
	  return $resource('expenses/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
}).factory("User", function ($resource){
	return $resource('users/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
})