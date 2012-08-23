angular.module('expenseServices', ['ngResource']).
    factory('Expense', function ($resource){
	  return $resource('expenses/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
}).factory("User", function ($resource){
	return $resource('users/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
}).factory("Unit", function ($resource){
	return $resource('units/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
}).factory("Item", function ($resource){
	return $resource('items/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
}).factory("Category", function ($resource){
	return $resource('categories/:id', {id : '@id'}, {
	    query: {method:'GET', params:{}, isArray:true},
	    update : {method : 'PUT'}
	  });
});