
/**
 * Created by Sameera on 5/2/2017.
 */
'user strict'

var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//--------------------------------------Darkz Server ---------------
var routedrug = require('./routes/drug.route');
server.use(routedrug);

var routebatch = require('./routes/batch.route');
server.use(routebatch);

//----------------------------------------------------------------
server.use(bodyParser.json());
server.use(express.static(__dirname));

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/PharmacySystem');
var database = mongoose.connection;

server.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});
//--------------------------------------------------------------SERVER SETUP----------------------------
server.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('server listening on port 3000');
});

//--------------------------------------------UMANI------------------------------------
