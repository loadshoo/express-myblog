var express = require('express');
var router = express.Router();
const model = require('../public/module/serach.js');
const remind = require('../public/module/remind.js');
const func = require('../public/js/utils.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

model.hasMany(remind, {
    foreignKey: 'code',
    sourceKey: 'code',
    as: 'remind'
})
remind.belongsTo(model, {
    foreignKey: 'code',
    targetKey: 'code',
    as: 'model'
})

router.get('/', function(req, res, next) {
    let title;
    let remindTxt;
    model.findAndCountAll({
            where: {
                stick: 1
            }
        })
        .then(data => {
            // console.log(data.rows[0].toJSON(), 'home')
            data.rows = func.jsonPaser(data.rows);
            title = data.rows;
            // console.log(title,'title')
            let codeList = [];
            title.forEach((v, i) => {
                codeList.push(v.code);
            })
            // console.log(codeList)
            // res.render('home', { data: data });
            return remind.findAndCountAll({
                where: {
                    code: {
                        [Op.in]: codeList
                    }
                }
            })
        })
        .then(data1 => {
            data1.rows = func.jsonPaser(data1.rows);
            remindTxt = data1.rows;
            title.forEach((v,i) => {
                remindTxt.forEach((item, cur) => {
                    if(v.code === item.code) {
                        v.info = item.info;
                    }
                })
            })
            let datas = {};
            datas.data = title;
            datas.code = 0;
            datas.msg = "成功"
            // console.log(datas, 'cccc')
            res.render('home', { datas: datas });
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/back/getArticle',function(req, res, next){
    let title;
    let remindTxt;
    // console.log(req,'req')
    model.findAndCountAll({
            where: {
                stick: req.body.stick
            }
        })
        .then(data => {
            // console.log(data.rows[0].toJSON(), 'home')
            data.rows = func.jsonPaser(data.rows);
            title = data.rows;
            // console.log(title,'title')
            let codeList = [];
            title.forEach((v, i) => {
                codeList.push(v.code);
            })
            // console.log(codeList)
            // res.render('home', { data: data });
            return remind.findAndCountAll({
                where: {
                    code: {
                        [Op.in]: codeList
                    }
                }
            })
        })
        .then(data1 => {
            data1.rows = func.jsonPaser(data1.rows);
            remindTxt = data1.rows;
            title.forEach((v,i) => {
                remindTxt.forEach((item, cur) => {
                    if(v.code === item.code) {
                        v.info = item.info;
                    }
                })
            })
            let datas = {};
            datas.data = title;
            datas.code = 0;
            datas.msg = "成功"
            // console.log(datas, 'cccc')
            res.status(200).json(datas);
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router;