
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BatchSchema = new Schema({
    batchNumber: {
        type: String,
        required: true
    },
    drugId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    manufacturerDate: {
        type: Date,
        required: true
    },
    exprieDate: {
        type: Date,
        required: true
    },

    addedDate: {
        type: Date,
        required: true
    }

});

var Batch = module.exports = mongoose.model('Batch',BatchSchema);


//get category
module.exports.getBatchs = function (callback, limit) {
    Batch.find(callback).limit(limit);
};


//add category
module.exports.addBatch = function( batchinfo ,callback){
    Batch.create(batchinfo , callback);
}

//upadate category
module.exports.updateBatch= function( id, batchinfo, options ,callback){
    var query = {batchNumber:id};
    var update = {
        drugCategory : batchinfo.drugCategory,
        addedDate : batchinfo.addedDate,
        quantity : batchinfo.quantity


    }
    Batch.findOneAndUpdate(query, update, options , callback);
}