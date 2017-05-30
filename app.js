var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const data = require('./data');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.get('/keyboard', (req, res) => {
  console.log('키보드로 왔군요');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).send({ type : "text", buttons : ["안녕", "헬로우", "콘니치와"]});
});

app.get('/favicon.ico', (req, res) => {
  res.send(data.messageSet);
});

app.post('/message', (req, res) => {
  console.log('메세지로 왔군요');
  res.send(data.messageSet);
});

app.post('/friend', (req, res) => {
  console.log('프렌드로 왔군요');
  res.send(data.messageSet);
});

app.delete('/chat_room/test', (req, res) => {
  console.log('챗룸으로 왔군요');
  res.send(data.messageSet);
});

app.delete('/friend/test', (req, res) => {
  console.log('프렌드 테스트로 왔군요');
  res.send(data.messageSet);
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var port = process.env.port || process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Web Server listening on port %s', port);
});

module.exports = app;
