//alowed us to set up server port and provide us with http methods ("get", "post", "put", "delete") routes
var express = require("express");
var ejs = require("ejs");
var engine = require("ejs-mate");
var app = express();

app.get("/", function(req, res, next){
  res.render("home");
})

//setting up middlewares to link our libraries
app.use(express.static(__dirname + "/public"));
app.engine("ejs", engine);
app.set("view engine", "ejs");


//server
app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
