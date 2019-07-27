const Sequelize = require('sequelize');
const db = require('./db.js')


const Serach = db().define('serach', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(100)
    },
    info: {
        type: Sequelize.STRING(200)
    },
    content: {
        type: Sequelize.STRING(6000)
    },
    imgUrl: {
        type: Sequelize.STRING(5000)
    },
    createdAt: {
        type: Sequelize.TIME,
    },
    updatadAt: {
        type: Sequelize.TIME,
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatadAt',
    tableName: 'serach',
})

module.exports = Serach;