var router = require("express").Router();
var User = require('../models/user');
var passport = require("passport");
var passportConf = require("../config/passport");



//get route for login
router.get('/login', function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', { message: req.flash('loginMessage')});
});

//post route for login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

//get route for profile page after login
router.get('/profile', function(req, res, next){
  User.findOne({ _id: req.user._id }, function(err, user){
    if(err) return next(err);
    res.render("accounts/profile", {user: user});
  });
});


//get route for signup
router.get("/signup", function(req, res, next){
  res.render("accounts/signup", {errors: req.flash('errors')});
})

//post route for signup
router.post('/signup', function(req, res, next){
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email }, function(err, existingUser){
    if(existingUser) {
      req.flash("errors", "Account with the email address already exist");
      return res.redirect('/signup');
    } else {
      user.save(function(err, user){
        if (err) return next(err);
        return res.redirect('/');
      });
    }
  });
});

module.exports = router;
