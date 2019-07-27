var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const model = require('../public/module/serach.js');
const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.query.text) {
        model.findAll({
            where: {
                [Op.or]:[
                    {
                        title: {
                            [Op.like]: '%' + req.query.text + '%'
                        } 
                    },
                    {
                        info: {
                            [Op.like]: '%' + req.query.text + '%'
                        } 
                    },
                    {
                        content: {
                            [Op.like]: '%' + req.query.text + '%'
                        } 
                    },
                ]
            },
            limit: 5
        })
        .then(data => {
            console.log(data)
            if(data.length > 0) {
                res.render('search',{ data: data });  
            } else {
                res.send('无数据');  
            }
        })
    } else {
        model.findAll({
            limit: 5
        })
            .then(data => {
                if(data.length > 0) {
                    res.render('search',{ data: data });  
                } else {
                    res.send('无数据');  
                }
            })
    }
});
router.get('/page', function(req, res, next) {
    let turn = req.query.turn;
    let page = req.query.page;
    if(page <= 0) {
        res.json({
            code: 1,
            msg: 'success'
        })
    } else {
        model.findAndCountAll({
            limit: 5,
            offset: 5*page
        })
        .then(data => {
                if(data.length > 0) {
                    res.render('search',{ data: data });  
                } else {
                    res.send('无数据');  
                }
            })
    }
})

module.exports = router;
