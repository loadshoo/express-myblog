var express = require('express');
var router = express.Router();
const model = require('../public/module/serach.js')


router.get('/', function(req, res, next) {
    res.render('inset',{data: 'sssssssss'})
});

router.get('/updata', function(req, res, next) {
    console.log(req.query)
    model.create({
        title: req.query.title,
        content: req.query.content,
    })
    .then(data => {
        res.json({
            code: 0,
            msg: 'success'
        })
    })
    
});

module.exports = router;