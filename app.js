var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var sass=require('node-sass-middleware');
var routes = require('./routes/index');

//routes
var configroute = require('./routes/config');
var users = require('./routes/users');
var classifica = require('./routes/classifica');
var calendario = require('./routes/calendario');
var competizioni = require('./routes/competizioni');
var squadre = require('./routes/squadre');
var rassegnastampa = require('./routes/rassegnastampa');

//db
var info=require('./models/info');
var mongoose=require('mongoose');
var db = require('./config/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var hbs = require('hbs');
hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
//sass engine setup
app.use(
  sass({
    src: path.join(__dirname,'sass'),
    dest: path.join(__dirname,'public','stylesheets'),
    prefix: '/stylesheets',
    debug: true
  })
);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport
app.use(session({secret: 'lavincentskin',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);

//handle sessions
app.use(function(req, res, next) {
    res.locals.user = req.user; // This is the important line
    next();
});
var isinit=false;
//setup
app.use(function(req,res,next){
  //if(req.app.locals.NomeLega == undefined){
  //if(req.app.locals.info == undefined || req.app.locals.info.Competizione==undefined){
  if(req.app.locals.info == undefined){
    info.findOne({}, function (err, i) {
      if (err)
        return console.log(err);
      if(i){
        req.app.locals.info=i;
        res.redirect(req.originalUrl);
      }else{
        isinit=true;
        req.app.locals.info='init';
        res.redirect('/config');
      }
    });
  }else{
    next();
  }
});

// routes
app.use('/', routes);
app.use('/users', users);
app.use('/config', function(req, res, next) {
  if (req.isAuthenticated() || isinit)
    return next();
  res.redirect('/');
}, function(req, res, next) {
  if (isinit){
    console.log('isinit : '+isinit);
    return next();
  }
  else if (req.user.Role == 'Admin')
    return next();
  res.redirect('/');
}, configroute);
app.use('/classifica', classifica);
app.use('/calendario', calendario);
app.use('/competizioni', competizioni);
app.use('/squadre', squadre);
app.use('/rassegnastampa', rassegnastampa);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler: will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler: no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
