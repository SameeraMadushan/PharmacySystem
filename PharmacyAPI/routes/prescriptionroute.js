/**
 * Created by Sameera on 5/7/2017.
 */

'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelprescrip = require('../models/prescription');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/prescriptions', function (req, res) {
    modelprescrip.getPrescriptions(function (err, Prescription) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(Prescription);
    });
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/prescriptions', function (req, res) {
    var prescr = req.body;
    modelprescrip.addPrescription(prescr, function (err,press) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(press);
    })
});

//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/prescriptions/:_id', function (req, res) {
    var id = req.params._id;
    var prescr = req.body;
    modelprescrip.updatePrescription(id, prescr, {}, function (err,press) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(press);
    })
});


module.exports = router;