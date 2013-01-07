module.exports.parseDate  = function (date,format){
	var arr;
	var res;
	switch(format){
		case "dd-mm-yyyy":
			arr = date.split("-");
			res = new Date(arr[2], arr[1],arr[0]);
		break;
		case "dd/mm/yyyy":
			arr = date.split("/");
			res = new Date(arr[2], arr[1],arr[0]);
		break;
	}

	return res;
}