//Requiring all lib from node
//****************************
//alowed us to set up server port and provide us with http methods ("get", "post", "put", "delete") routes
var express = require("express");
var ejs = require("ejs");
var engine = require("ejs-mate");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("express-flash");
var User = require('./models/user');
var app = express();


//Setup Mongoose database
//***********************
mongoose.connect("mongodb://root:abc123@ds063546.mlab.com:63546/passportdoc", function(err){
  if(err) {
    console.log(err);
  } else {
    console.log("Mongoose has successfully connected to database!");
  }
});

//setting up middlewares to link our libraries
//********************************************
//setup to allow express to access into the public folder (CSS, JS)
app.use(express.static(__dirname + "/public"));
//setting up morgan to log all status of user request (200, 300, 400) in terminal shell
app.use(morgan('dev'));
//for express to parse json data format
app.use(bodyParser.json());
//Setting up bodyParser for data to be transmitted to html via http //or whatever you want your server to receive
app.use(bodyParser.urlencoded({
   extended: true
 }));
 //Cookie parser allows information to be passed via sessions to retirve user information
 //cookie is stored in the browser to allow the browser to know which user i.e. user NRIC over the bank counter
 app.use(cookieParser());
 app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: "Projectx"
 }));
 app.use(flash());
//allow express to render views
app.engine("ejs", engine);
app.set("view engine", "ejs");

//setting up of routers
var mainRoute = require("./routes/main");
var userRoute = require("./routes/user");
app.use(mainRoute);
app.use(userRoute);

//server
app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
