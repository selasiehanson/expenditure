var mongoose = require("mongoose");
var Unit = require("../models/unit");
var Item  = require("../models/item");
var Expense = require("../models/expense");
exports.getUnits =  function (req, res){
	Unit.find().sort('-created_on').select().exec(function (err, docs){
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


	//todo : update item as well as expense.item.unit
	Unit.findByIdAndUpdate(id,params, function (err, doc){
		if(!err){
			var q1 = {
				"unit._id" : id
			};

			//update all items 
			Item.find(q1, function (err, docs){	
				docs.forEach(function (doc){
					doc.unit.name = params.name;
					doc.save();
				});
			});

			
			var q2 = {
				"item.unitId" : id
			};
			//update all expenses
			Expense.find(q2, function (err, docs){
				docs.forEach(function (doc){
					doc.item.unit  = params.name;
					doc.save()
				});
			});

			res.send({message: "Unit updated sucessfully"});

		}
		else
			console.log(err)
	});
}

exports.deleteUnit = function (req, res){
	//todo : check to make sure no item is using this unit.
	
	var id = mongoose.Types.ObjectId.fromString(req.params.id);
	Unit.findByIdAndRemove(id, function (err){
		//todo : check for error
		res.send("Unit deleted.")
	});
}