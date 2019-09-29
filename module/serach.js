const Sequelize = require('sequelize');
const db = require('./db.js')


const Serach = db().define('title', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING(8)
    },
    url: {
        type: Sequelize.STRING(500)
    },
    title: {
        type: Sequelize.STRING(500)
    },
    category: {
        type: Sequelize.STRING(500)
    },
    stick: {
        type: Sequelize.INTEGER(2)
    },
    createdAt: {
        type: Sequelize.TIME,
    },
    updatedAt: {
        type: Sequelize.TIME,
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tableName: 'title',
})

module.exports = Serach;