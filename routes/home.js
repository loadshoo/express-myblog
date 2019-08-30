var express = require('express');
var router = express.Router();
const model = require('../public/module/serach.js')

router.get('/', function(req, res, next) {
    model.findAll()
        .then(data => {
            res.render('home', { data: data[0].toJSON() });  
        })
        .catch(err => {
            console.log(err)
        })
});


module.exports = router;