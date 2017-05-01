var express=require('express');
var router=express.Router();

var User=require('../models/User');
var Patient=require('../models/Patient');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');

/**
 * add patient
 */
router.post('/create-patient',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var currentUserId = decoded._id;

    var patient = new patient({
        name: req.body.name,
        age: ((req.body.age)),
        dateOfBirth: (req.body.dateOfBirth),
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        prescriptionDetails: req.body.prescriptionDetails,
        checkedBy: req.body.checkedBy,
        date: req.body.date

    });
    patient.save(function (err) {
        if (err) {
            return res.json({success: false, msg: "error in saving to database"});
        }
        return res.json({success: true});


        Patient.update({_id:req.body._patient},{"$push":{"patient":patient._id}},function (err, parent) {
            if(err)console.error(err);
            else{
                return res.json({success: true,id:patient._id});
            }
        });



    })
});

/**
 * delete patient
 */
router.delete('/remove-patient/:id',passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var requestingUserId=decoded._id;
    Patient.findOne({
        _id:req.params.id
    },function (err, patient) {
        if(patient._id==requestingUserId){
            patient.remove({_id:req.params.id},function (err, patient) {
                if(err){
                    res.send(err);
                }
                console.log(patient);
                res.json(patient);
            })
        }
        else{
            res.send(err);
        }
    });
});
