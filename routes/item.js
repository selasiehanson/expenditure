var mongoose = require("mongoose");
var Item = require("../models/item");

exports.getItems = function (req, res){
	Item.find({}, function(err, docs){
		res.send(docs);
	})
}

exports.getItem =  function (req, res){

}

exports.createItem =  function (req, res){

	var _in  = req.body;
	var params = {
		category : {},
		unit : {}
	};
	var date =  new Date();

	params.name = _in.name;
	
	params.unit.name = _in.unit.name;
	params.unit._id = _in.unit._id;

	params.category.name = _in.category.name;
	params.category._id = _in.category._id;

	params.created_on = date;
	params.updated_on = date;
	console.log(params);

	var item = new Item(params);
	item.save(function (err, doc){
		if (err)
			console.log(err)
		res.send({
			message : "Item created successfully"
		});
	});
}


exports.updateItem = function(req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	var _in = req.body;
	console.log(_in)
	var _in  = req.body;
	var params = {
		category : {},
		unit : {}
	};
	
	params.name = _in.name;
	
	params.unit.name = _in.unit.name;
	params.unit._id = _in.unit._id;

	params.category.name = _in.category.name;
	params.category._id = _in.category._id;

	params.updated_on = new Date();;
	console.log(params);

	Item.findByIdAndUpdate(id,params, function (err, doc){
		if(!err)
			res.send({message: "Item updated sucessfully"});
		else
			console.log(err)
	});
}

exports.deleteItem =  function(req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	Item.findByIdAndRemove(id, function (err){
		//todo : check for error
		res.send("Item deleted.")
	});
}