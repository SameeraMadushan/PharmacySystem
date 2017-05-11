
'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelbatch = require('../models/batch');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/batch', function (req, res) {
    modelbatch.getBatchs(function (err, batchObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(batchObj);
    });
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/batch', function (req, res) {
    var prescr = req.body;
    modelbatch.addBatch(prescr, function (err,batchObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(batchObj);
    })
});

//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/batch/:batchNumber', function (req, res) {
    var id = req.params.batchNumber;
    var drugs = req.body;
    modelbatch.updateBatch(id, drugs, {}, function (err,batchObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(batchObj);
    })
});


module.exports = router;