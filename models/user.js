var mongoose = require("mongoose");
//bcrypt is a lib to hash the password
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

//*user schema attributes / charectoristics / fields*/
var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  profile: {
    name: { type: String, default: ''},
    picture: { type: String, default: ''}
  },
  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: ''}
  }]
})


//* Hash the password before we save it to the database
//"pre" before we want to save, we need to do something to it
UserSchema.pre("save", function(next){
  var user = this;
  user.name = "Guest";
  if(!user.isModified('password')) return next();
  //if no error bcrypt to generate 10 different data
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
  //then pass bcrypt function to user password by hashing it
  bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});


// UserSchema.pre("save", function(next){
//   var user = this;
//   user.name = "handsome";
// })


//* compare password in the database and the one user entered
//this is a custom method u create yourself - always start with UserSchema.methods.yourFunctionName
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};


//To make schema model available to all of app
module.exports = mongoose.model('User', UserSchema);
