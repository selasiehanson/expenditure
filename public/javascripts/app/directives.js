angular.module("expenseDirectives",[]).
	directive('myTable', function() {
        return function(scope, element, attrs) {
        	window.attrs = attrs
            // apply DataTable options, use defaults if none specified by user
            var options = {};
            if (attrs.myTable.length > 0) {
                options = scope.$eval(attrs.myTable);
            } else {
                options = {
                    "bStateSave": true,
                    // "iCookieDuration": 2419200, /* 1 month */
                    //"bJQueryUI": true,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "bFilter": true,
                    "bInfo": true,
                    "bDestroy": true,
                    "sDom": "<'row'<'span10'l f r t i p > >",
					"sPaginationType": "bootstrap",
					"oLanguage": {
						"sLengthMenu": "_MENU_ records per page"
					}, 
					// "fnDrawCallback": function ( oSettings ) {
				 //            /* Need to redo the counters if filtered or sorted */
				 //            var that = this;
				 //            if ( oSettings.bSorted || oSettings.bFiltered )
				 //            {
				 //                this.$('td:first-child', {"filter":"applied"}).each( function (i) {
				 //                    that.fnUpdate( i+1, this.parentNode, 0, false, false );
				 //                });
				 //            }
     //    			},
			  //       "aaSorting": [[ 1, 'asc' ]]
    			} 

                
            }

            // Tell the dataTables plugin what columns to use
            // We can either derive them from the dom, or use setup from the controller           
            var explicitColumns = [];
            window.el = element;
            var ths = element.find('th');
           	jQuery.each(ths,function(index, elem) {
                explicitColumns.push($(elem).text());
            });
            if (explicitColumns.length > 0) {
                options["aoColumns"] = explicitColumns;
            } else if (attrs.aoColumns) {
                options["aoColumns"] = scope.$eval(attrs.aoColumns);
            }

            // aoColumnDefs is dataTables way of providing fine control over column config
            if (attrs.aoColumnDefs) {
                options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
            }
            
            if (attrs.fnRowCallback) {
                options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
            }

            // apply the plugin
            var dataTable = jQuery(element).dataTable(options);
  
            // watch for any changes to our data, rebuild the DataTable
            scope.$watch(attrs.aaData, function(value) {
                var val = value || null;

                if (val) {
                	dataTable.fnClearTable();
                    dataTable.fnAddData(scope.$eval(attrs.aaData));
                }
            });
        };
    });