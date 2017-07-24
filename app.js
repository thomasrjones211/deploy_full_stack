var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var db = require('./db/knex');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/catnames', function(req, res, next) {
  db('catnames').select()
  .then(function(catnames){
    res.json(catnames);
  })
  .catch(function(err){
    next(err);
  });
})

app.post('/catnames', validateCatName, function(req, res, next) {
  db('catnames').insert(req.body)
  .then(function(result){
    res.send(result);
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
});

function validateCatName(req, res, next) {
  if(!req.body.name){
    return next(new Error('name is missing'));
  }

  const number = Number(req.body.name);
  if(!isNaN(number)) {
    return next(new Error('put in a string'));
  }

  next();
}

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
  res.send('error');
});

module.exports = app;
