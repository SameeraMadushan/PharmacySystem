/**
 * Created by Sameera on 5/7/2017.
 */
'user strict'

var express = require('express');
var router = express.Router();

var modeldispense = require('../models/drugdispense');


//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/dispenses', function (req, res) {
    modeldispense.getDispense(function (err, dispense) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(dispense);
    });
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/dispenses', function (req, res) {
    var drugDis = req.body;
    modeldispense.addDrugDispenses(drugDis, function (err,drugDispense) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(drugDispense);
    })
});

//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/dispenses/:_id', function (req, res) {
    var id = req.params._id;
    var drugDis = req.body;
    modeldispense.updateDrugDispense(id, drugDis, {}, function (err,drugDispense) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(drugDispense);
    })
});


module.exports = router;