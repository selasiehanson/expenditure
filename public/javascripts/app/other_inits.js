(function() {
	var $ = jQuery;
	$('#nav_menu .accordion-group .accordion-heading').live('click', function() {
		$('#nav_menu .accordion-group .accordion-heading').removeClass('active-head');
	    $(this).addClass('active-head');
	 });

}).call();