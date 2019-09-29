var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const model = require('../module/serach.js');
const remind = require('../module/remind.js');
const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {
    let page = req.query.page;
    // console.log(req.url,'req.url')
    if (req.query.text) {
        model.findAndCountAll({
                where: {
                    [Op.or]: [{
                            title: {
                                [Op.like]: '%' + req.query.text + '%'
                            }
                        },
                        {
                            url: {
                                [Op.like]: '%' + req.query.text + '%'
                            }
                        },
                        {
                            category: {
                                [Op.like]: '%' + req.query.text + '%'
                            }
                        },
                    ]
                },
                limit: 5,
                offset: 5 * page
            })
            .then(data => {
                console.log(data,'sssssss')
                if (data.count > 0) {
                    res.render('search', { data: data.rows, req: req.query});
                } else {
                    res.send('无数据');
                }
            })
    } else {
        model.findAndCountAll({
                limit: 5,
                offset: 5 * page
            })
            .then(data => {
                console.log(data,'ddddddddd')
                if (data.count > 0) {
                    res.render('search', { data: data.rows, req: req.query });
                } else {
                    res.send('无数据');
                }
            })
    }
});
// router.get('/page', function(req, res, next) {
//     let turn = req.query.turn;
//     let page = req.query.page;
//     if (page < 0) {
//         res.json({
//             code: 1,
//             msg: 'success'
//         })
//     } else {
//         model.findAndCountAll({
//                 limit: 5,
//                 offset: 5 * page
//             })
//             .then(data => {
//                 console.log(data, 'fffffff')
//                 if (data.count > 0) {
//                     res.render('search', { data: data.rows });
//                 } else {
//                     res.send('无数据');
//                 }
//             })
//     }
// })

module.exports = router;