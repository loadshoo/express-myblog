var express = require('express');
var router = express.Router();
const remind = require('../module/remind.js')
const paragraph = require('../module/paragraph.js')
const Sequelize = require('sequelize');
const func = require('../common/utils.js');

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

router.param('id', function (req, res, next, id) {
    next();
});

router.get('/code/:id',function(req, res, next) {
    // console.log(req.params.id,'req');
    let remindData;
    remind.findAndCountAll({
            where: {
                code: req.params.id
            },
            include: [{
                model: paragraph,
                as: 'paragraph',
                'where': {
                    'code': req.params.id
                },
            }]
        })
        .then(data => {
            datas = func.jsonPaser(data.rows[0]);
            res.render('article', { datas: datas });
        })
        .catch(err => {
            console.log(err)
        })
});



module.exports = router;