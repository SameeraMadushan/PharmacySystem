var express=require('express');
var router=express.Router();
var User=require('../models/User');

var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');
// var getToken=require('../commons/utilities');

router.get('/test',function (req, res) {
    return res.json({success:true});
});
router.get('/test2',function (req, res) {
    return res.json({success:true,msg:"Test 2"});
});

/**
 * ==============================================================================================================
 * Finalized urls
 */
// router.post('/sign-up',function (req, res) {
//     if(!req.body.email||!req.body.password||!req.body.firstName||!req.body.lastName||!req.body.accountType){
//         res.json({success:false,msg:'Enter the details man'});
//     }
//     else{
//         var newUser=new User({
//             firstName:req.body.firstName,
//             lastName:req.body.lastName,
//             accountType:req.body.accountType,
//             email:req.body.email,
//             password:req.body.password
//         });
//         newUser.save(function (err) {
//             if(err){
//                 res.json({success:false,msg:'The email is already in use.'});
//             }
//             else{
//                 res.json({success:true,msg:'User created'});
//
//             }
//         })
//     }
// });
//
// /**
//  * user login
//  * generate a token
//  */
// router.post('/authenticate',function (req, res) {
//     User.findOne({email:req.body.email},function (err, user) {
//
//         if(err) throw err;
//         if(!user){
//             return res.status(403).send({success:false,msg:"Authentication fails"});
//         }
//         else{
//             user.comparePassword(req.body.password,function (err, isMatch) {
//                 if(isMatch && !err){
//                     var token=jwt.encode(user,config.secret);
//                     return res.json({success:true,token:'JWT '+token,msg:"Authentication success",accountType:user.accountType,
//                         firstName:user.firstName,lastName:user.lastName});
//
//                 }
//                 else{
//                     return res.status(403).send({success:false,msg:"Authentication fails"});
//                 }
//             })
//         }
//     })
// });
//






module.exports=router;