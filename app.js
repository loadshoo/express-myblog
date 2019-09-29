var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routers = require('./common/router.js')


var jwt = require('jsonwebtoken');

var app = express();

// console.log(fs.readdirSync('./routes'),'path')

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
    if (req.path !== '/login' && req.path.indexOf('back') != -1) {
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

//动态设置路由

routers.forEach((v,i,arr) => {
    let urlPath = './routes/'+v;
    let routerUrl;
    if(v === 'index') {
        routerUrl = "/"
    } else {
        routerUrl = '/'+v;
    }
    // console.log(urlPath, routerUrl, 'path')
    let pathDir = require(urlPath);
    app.use(routerUrl, pathDir);
})


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