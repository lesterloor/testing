var express = require('express');
var router = express.Router();
var pug = require("pug");
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
var passport = require('passport')
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

router.use(express.static("public"));
/* GET home page. */
router.get('/profile', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('profile', { title: 'Register' });
});
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Register' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});
router.post('/register', function(req, res, next) {

  req.checkBody('username', 'Something is missing.').notEmpty();
  req.checkBody('email', 'Something is missing.').notEmpty();
  req.checkBody('email', 'Invalid Email, please try again.').isEmail();
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors){console.log(`errors: ${JSON.stringify(errors)}`);
      res.render('register', { title: 'Register Error', errors:errors });

  }else{

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    var User = require('../db.js');
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      User.create({
        username: username,
        email: email,
        password: hash
      }).then(function(results) {
        const user_id = results.id;
        const userName = results.username;
        console.log(results.id);
        req.login(user_id, function(err) {
          res.redirect('profile');
        });
      });
    });
  }
});
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

module.exports = router;
