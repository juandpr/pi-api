const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const piRouter = require('./routes/pi');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', indexRouter);
app.use('/pi', piRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    const isDevEnv = req.app.get('env') === 'development';
    res.locals.message = err.message;
    res.locals.error = isDevEnv ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: 'Something wrong happened!'});

    if (isDevEnv) {
      res.json({error: err.message});
      console.error(err);
    }
});

module.exports = app;
