const express = require('express');
const router = express.Router();
const func = require('../common/utils.js');
const User = require('../module/user.js');
const Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res, next){
    console.log('req.body:',req.body)
    User.findAll({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(data => {
        dataValues = func.jsonPaser(data);
        console.log('login:', dataValues)
        let obj = {}
        obj.type = dataValues[0].type;
        obj.username = dataValues[0].username;
        obj.token = jwt.sign(dataValues[0], 'secret', { expiresIn: '1h' });
        console.log('token:',obj.token)
        datas = func.jsonContent(obj);
        res.status(200).json(datas);
    })
    .catch(err => {
        // console.log(err)
        let datas = func.jsonContent('error', '10001', '用户名或密码错误!');
        res.status(200).json(datas);
    })
})

module.exports = router;