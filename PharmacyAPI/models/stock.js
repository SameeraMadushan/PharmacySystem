var mongoose = require('mongoose');

//Drug Schema

var drugSchema = mongoose.Schema({

name:{
	type: String,
	required: true
},
amount:{
	type: String,
	required: true
},

reorderlevel:{
	type: String,
	
},

create_date:{
	type: Date,
	default: Date.now
}

});

var Drugs = module.exports = mongoose.model('Drugs',drugSchema);

//Get Stock

module.exports.getAvailableStock = function(callback,limit){
Drugs.find(callback).limit(limit);

}

module.exports.stockDetailsByID = function(id,callback){
Drugs.findById(id,callback);

}

//Add Stock
module.exports.addDrugToStock = function(drug,callback){
Drugs.create(drug,callback);
 
}

//Update Stock
module.exports.updateDrugStock = function(id,drug,options,callback){
var query = {_id: id}	
var update = {
	name: drug.name,
	amount: drug.amount,
	reorderlevel: drug.reorderlevel
}
Drugs.findOneAndUpdate(query,update,options,callback);

}


//Delete Drug from stock
module.exports.deleteDrugFromStock = function(id,callback){
	var query = {_id: id}	
Drugs.remove(query,callback);
 
}