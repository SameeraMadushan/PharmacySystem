/**
 * Created by Sameera on 5/7/2017.
 */

'user strict'

var express = require('express');
var router = express.Router();

var modelpayment = require('../models/patientpayment');

//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/payments', function (req, res) {
    modelpayment.getPayments(function (err, payment) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(payment);
    });
});
//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/payments', function (req, res) {
    var payment = req.body;
    modelpayment.addPayment(payment, function (err,Payment) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(Payment);
    })
});


module.exports = router;