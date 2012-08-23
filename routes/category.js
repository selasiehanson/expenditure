var mongoose = require("mongoose");
var Category = require("../models/category");

exports.getCategories = function (req, res){
	Category.find({}, function (err, docs){
		res.send(docs);
	});
}

exports.getCategory = function (req, res){
	
}

exports.createCategory = function (req, res){
	var params = {}
	var date  =  new Date();
	var _in  = req.body;
	
	params.name = _in.name;
	params.description = _in.description || " ";
	params.updated_at = date;
	params.created_on = date;
	var category =  new Category(params);
	category.save(function (err){
		res.send({
			message : "Category created successfully"
		});
	});
}

exports.updateCategory = function (req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	var _in = req.body;
	var params  = {}
	
	params.name = _in.name;
	params.description = _in.description || " ";
	params.updated_at = new Date();

	Category.findByIdAndUpdate(id,params, function (err, doc){
		if(!err)
			res.send({message: "Category updated sucessfully"});
		else
			console.log(err)
	});
}

exports.deleteCategory = function (req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	Category.findByIdAndRemove(id, function (err){
		//todo : check for error
		res.send("Category deleted.")
	});
}