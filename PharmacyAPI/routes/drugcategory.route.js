
'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelDrug = require('../models/drug');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/drugCategory', function (req, res) {

    modelDrug.getDrugsCategory(function (err, DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/drugCategory', function (req, res) {

    var prescr = req.body;
    // res.json('asd');
    modelDrug.addDrugCategory(prescr, function (err,DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});

//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/drugCategory/:_id', function (req, res) {
    var id = req.params._id;
    var drugs = req.body;
    modelDrug.updateDrugCategory(id, drugs, {}, function (err,DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});


module.exports = router;