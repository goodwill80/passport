//Requiring all lib from node
//****************************
//alowed us to set up server port and provide us with http methods ("get", "post", "put", "delete") routes
var express = require("express");
var ejs = require("ejs");
var engine = require("ejs-mate");
var morgan = require("morgan");
var mongoose = require("mongoose");
var app = express();

app.get("/", function(req, res, next){
  res.render("home");
})

//setting up middlewares to link our libraries
//********************************************

//setting up morgan to log all status of user request (200, 300, 400) in terminal shell
app.use(morgan('dev'));
//setup to allow express to access into the public folder (CSS, JS)
app.use(express.static(__dirname + "/public"));
//allow express to render views
app.engine("ejs", engine);
app.set("view engine", "ejs");


//server
app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
