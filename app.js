var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var serviceRouter = require('./routes/serviceRouter');
var usersRouter = require('./routes/usersRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // promise library

const Services = require('./models/services');
const Users = require('./models/user');

const url = 'mongodb://localhost:27017/startup';
const connect = mongoose.connect(url, {
    useMongoClient: true,
  });

connect.then((db) => {
    console.log("Connected the server");
}, (err) => { console.log(err); });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));


app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {

  if (!req.session.user) {
        var err = new Error('You are not authenticated!');
        
        err.status = 401;
        next(err); 
        return;
  }
  else {
      if (req.session.user === 'authenticated') {
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 403;
          return next(err);
      }
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public'))); // before allowing any data fetch , person should authenticate

app.use('/about', aboutRouter);
app.use('/services', serviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
