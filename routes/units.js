var mongoose = require("mongoose");
var Unit = require("../models/unit");
exports.getUnits =  function (req, res){
	Unit.find({},function (err, docs){
		res.send(docs);
	})	
}

exports.getUnit = function (req, res){

}

exports.createUnit = function (req, res){
	var params = {}
	var date  =  new Date();
	var _in  = req.body;
	
	params.name = _in.name;
	params.symbol = _in.symbol;
	params.description = _in.description || " ";
	params.updated_at = date;
	params.created_on = date;
	var unit =  new Unit(params);
	unit.save(function (err){
		res.send({
			message : "Unit created successfully"
		});
	})
}

exports.updateUnit =  function(req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	var _in = req.body;
	var params  = {}
	
	params.name = _in.name;
	params.symbol = _in.symbol;
	params.description = _in.description || " ";
	params.updated_at = new Date();

	Unit.findByIdAndUpdate(id,params, function (err, doc){
		if(!err)
			res.send({message: "Unit updated sucessfully"});
		else
			console.log(err)
	});
}

exports.deleteUnit = function (req, res){
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	Unit.findByIdAndRemove(id, function (err){
		//todo : check for error
		res.send("Unit deleted.")
	});
}