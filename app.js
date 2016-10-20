var express = require("express");
var app = express();






//server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});
