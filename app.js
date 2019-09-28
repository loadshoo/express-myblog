var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var insetRouter = require('./routes/inset');
var articleRouter = require('./routes/article');
var loginRouter = require('./routes/login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//请求拦截，验证token
app.use(function(req, res, next) {
    if (req.path !== '/login') {
        var token = req.headers['authorization'].split(' ')[1];
        console.log('token:',token)
        if (token) {
            jwt.verify(token, 'secret', function(err, decoded) {
                console.log('err:', err);
                console.log('decoded:', decoded);
                if (err) {
                    return res.status(200).json({ code: '10004', msg: 'token已过期' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(200).json({
                code: '10004',
                message: '没有找到token!'
            });
        }
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/inset', insetRouter);
app.use('/search', searchRouter);
app.use('/article', articleRouter);
app.use('/login', loginRouter);


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