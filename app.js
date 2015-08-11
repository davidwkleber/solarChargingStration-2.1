var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


serialListener = require('child_process').fork(__dirname+'/serialListener.js');
// var serialWriter = require('./serialWriter');
// serialWriter();

serialListener.on('message', function(m) {
	console.log('app got message: '+ m);
});


serialListener.send('message');


var routes = require('./routes/index');

var mainScreen = require('./routes/mainScreen');
// var dataInput = require('./routes/dataInput');

var record = require('./routes/record');

var app = express();


// serialListener('COM1');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('index', routes);


app.use('/mainScreen', mainScreen);
// app.use('/dataInput', dataInput);

// app.use('/record', record);

// app.get('/recordData', record.recordData);
// app.post('/stopRecording', record.stopRecording);
// app.post('/saveData', record.saveData);


if (app.get('env') === 'development') {
 console.log('App in Dev mode');
} else {
	console.log('App in Prod mode');
};

/// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
	console.log('error bad boy ');
 //   res.render('error', {
  //      message: err.message,
  //      error: {}
  //  });

});


module.exports = app;

