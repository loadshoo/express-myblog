var express = require('express');
var router = express.Router();
const remind = require('../public/module/remind.js')
const paragraph = require('../public/module/paragraph.js')


router.get('/', function(req, res, next) {
    let remindData;
    remind.findAll({
            where: {
                code: req.query.code
            }
        })
        .then(data => {
            // console.log(data[0].dataValues,'rrrr')
            // res.render('article', { remind: data[0].dataValues });
            remindData = data[0].dataValues;
            return paragraph.findAll({
                where: {
                    code: req.query.code
                }
            })
        })
        .then(data => {
            res.render('article', { remind: remindData, paragraph: data });
        })
        .catch(err => {
            console.log(err)
        })
});

// router.get('/', function(req, res, next) {
//     paragraph.findAll({
//             where: {
//                 code: req.query.code
//             }
//         })
//         .then(data => {
//             console.log(data, 'pppp')
//             next()
//             res.render('article', { paragraph: data });
//         })
//         .catch(err => {
//             console.log(err)
//         })
// });


module.exports = router;