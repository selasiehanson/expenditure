// Provide the wiring information in a module
angular.module('myHelpers', []).
 
  // Teach the injector how to build a 'greeter'
  // Notice that greeter itself is dependent on '$window'
  factory('helper', function($window) {
    // This is a factory function, and is responsible for 
    // creating the 'greet' service.
    return {
      	getSelectIndex : function (obj,arr){
			var _el = null;
	        _idx = null;
	        arr.filter(function (el, idx){
	        	if( el._id == obj._id){
	        		_idx = idx;
	        		console.log(_idx)
	        	}	
	        });
	       return _idx;
	    }, 
	    formartDate : function (format, date){
	    	console.log(date)
	    	var _date =  new Date(date);
	    	out = _date.toDateString();
	    	switch(format){
	    		case "dd-mm-yyyy":
	    			out = _date.getDate() + "-"+ _date.getMonth() + "-" + _date.getFullYear();
	    		break;
	    		default: break;
	    	}
	    	console.log(out)
	    	return out;
	    }
    };
  });