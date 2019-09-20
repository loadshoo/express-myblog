var express = require('express');
var router = express.Router();
const remind = require('../public/module/remind.js')
const paragraph = require('../public/module/paragraph.js')
const Sequelize = require('sequelize');
const func = require('../public/js/utils.js');

remind.hasMany(paragraph, {
    foreignKey: 'code',
    sourceKey: 'code',
    as: 'paragraph'
})
paragraph.belongsTo(remind, {
    foreignKey: 'code',
    targetKey: 'code',
    as: 'remind'
})

router.get('/code/*', function(req, res, next) {
    // console.log(req.params[0],'req');
    let remindData;
    remind.findAndCountAll({
            where: {
                code: req.params[0]
            },
            include: [{
                model: paragraph,
                as: 'paragraph',
                'where': {
                    'code': req.params[0]
                },
            }]
        })
        .then(data => {
            datas = func.jsonPaser(data.rows[0]);
            console.log(datas,'ssss')
            // console.log(data.rows[0].remind.dataValues.info, 'ffffff')
            res.render('article', { datas: datas });
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