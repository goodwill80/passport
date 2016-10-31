var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');


  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//middleware
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) return done(err);

      // If no user is found
      if (!user) return done(null, false, req.flash('errorMessage', 'No user found.'));

      // Check if the password is correct
      if (!user.comparePassword(password)) return done(null, false, req.flash('errorMessage', 'Please check your password!'));

      return done(null, user);
    });
  }));


//check for authentication
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
