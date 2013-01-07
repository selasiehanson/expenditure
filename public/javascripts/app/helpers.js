// Provide the wiring information in a module
angular.module('myHelpers', []).
  factory('helper', function($window) {
    return {
      	getSelectIndex : function (obj,arr){
			var _el = null;
	        _idx = null;
	        arr.filter(function (el, idx){
	        	if( el._id == obj._id){
	        		_idx = idx;
	        	}	
	        });
	       return _idx;
	    }, 
	    formatDate : function (format, date){
	    	var _date =  new Date(date);
	    	out = _date.toDateString();
	    	switch(format){
	    		case "dd-mm-yyyy":
	    			out = _date.getDate() + "-"+ _date.getMonth() + "-" + _date.getFullYear();
	    		break;
	    		default: break;
	    	}
	    	//console.log(out)
	    	return out;
	    }
    };
  });