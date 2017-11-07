var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var index = require('./routes/index');
var users = require('./routes/users');
var connection = require('./db.js');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var Sequelize = require('sequelize');


//authentication packages


var app = express();

require('dotenv').config();

// view engine setup
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set(express.static('./public'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connect().use(connect.session({
    store: new SequelizeStore(options),
    secret: 'keyboard ifunnymeme',
    resave: false,
    saveUninitialized: false,
}));

// app.use(session({
//   secret: 'keyboard ifunnymeme',
//   resave: false,
//   saveUninitialized: false,
// }))

app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});










module.exports = app;
