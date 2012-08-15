angular.module('expenseServices', ['ngResource']).
    factory('Expense', function($resource){
  return $resource('expenses/:id', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
});