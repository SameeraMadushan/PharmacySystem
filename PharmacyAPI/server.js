/**
 * Created by Sameera on 5/2/2017.
 */
'user strict'

var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routeprescrip = require('./routes/prescriptionroute');
var routedispense = require('./routes/dispenseroute');
var routepayment = require('./routes/paymentroute');

server.use(routeprescrip);
server.use(routedispense);
server.use(routepayment);

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


