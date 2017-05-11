
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


//--------------------------------------Darkz Server ---------------
var routedrug = require('./routes/drug.route');
server.use(routedrug);

var routebatch = require('./routes/batch.route');
server.use(routebatch);


//-------------------------------------------------------------
//----------------------------------------------------------------
server.use(bodyParser.json());
server.use(express.static(__dirname));

//connect to mongoose
/*mongoose.connect('mongodb://localhost:27017/PharmacySystem');
var database = mongoose.connection;*/

server.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});
//--------------------------------------------------------------SERVER SETUP----------------------------
/*server.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('server listening on port 3000');
});*/

//--------------------------------------------UMANI------------------------------------

//var express=require('express');
var path=require('path');
var cors=require('cors');
//var bodyParser=require('body-parser');
// var morgan      = require('morgan');
//var mongoose    = require('mongoose');
var passport	= require('passport');
// var jwt         = require('jwt-simple');
var session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

var config      = require('./config/database'); // get db config file

var User        = require('./models/User');   // get the mongoose models

var api=require('./routes/api');
var patientApi=require('./routes/patient');


var port = 3000;

var server=express();

//view engine
// server.set('views',path.join(__dirname,'client/views'));
// server.set('view engine','ejs');
// server.engine('html',require('ejs').renderFile);



//body parser middleware
//server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

// Use the passport package in our application
server.use(passport.initialize());

mongoose.connect(config.database);


server.use(session({secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    // store:new MongoStore({mongooseConnection:mongoose.connection})
}));

require('./config/passport')(passport);

server.use(cors());



app.use('/api',api);
app.use('/api/patient',patientApi);



server.listen(port,function () {
    console.log("Server started on port "+port);
});
