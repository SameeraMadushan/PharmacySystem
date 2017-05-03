var express=require('express');
var path=require('path');
var cors=require('cors');
var bodyParser=require('body-parser');
// var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
// var jwt         = require('jwt-simple');
var session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

var config      = require('./config/database'); // get db config file

var User        = require('./models/User');   // get the mongoose models

var api=require('./routes/api');
var patientApi=require('./routes/patient');

var port = 3000;

var app=express();

//view engine
// app.set('views',path.join(__dirname,'client/views'));
// app.set('view engine','ejs');
// app.engine('html',require('ejs').renderFile);



//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Use the passport package in our application
app.use(passport.initialize());

mongoose.connect(config.database);


app.use(session({secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    // store:new MongoStore({mongooseConnection:mongoose.connection})
}));

require('./config/passport')(passport);

app.use(cors());


app.use('/api',api);
app.use('/api/patient',patientApi);

app.listen(port,function () {
    console.log("Server started on port "+port);
});
