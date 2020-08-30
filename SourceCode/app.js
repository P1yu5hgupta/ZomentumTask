const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const Router = require('./routes/app.route');

const app = express();

// Connect to Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ZomentumTask', { useNewUrlParser: true } ,(error) =>{
  if(error){
    console.log("Error connecting to Database");
  }
  else{
    console.log("Connected to Database.....");
  }
});
//Database Connected

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing
app.use('/', Router); // Get to the routing options in app.route.js


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
