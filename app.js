//Requiring all lib from node
//****************************
//alowed us to set up server port and provide us with http methods ("get", "post", "put", "delete") routes
var express = require("express");
var ejs = require("ejs");
var engine = require("ejs-mate");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
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
//for express to parse json data format
app.use(bodyParser.json());
//Setting up bodyParser for data to be transmitted to html via http //or whatever you want your server to receive
app.use(bodyParser.urlencoded({
   extended: true
 }));
//setting up morgan to log all status of user request (200, 300, 400) in terminal shell
app.use(morgan('dev'));
//allow express to render views
app.engine("ejs", engine);
app.set("view engine", "ejs");

//Testing of User Schema
//**********************

app.post("/users", function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err){
    if(err) return next(err);
    res.json("You have successfully created a new user!");
  });
});

app.get("/", function(req, res){
  res.render('main/home');
})

app.get("/about", function(req, res){
  res.render('main/about');
})



//server
app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
