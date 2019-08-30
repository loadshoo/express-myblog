const Sequelize = require('sequelize');
const db = require('./db.js');

const Remind = db().define('remind', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING(8)
    },
    info: {
        type: Sequelize.STRING(5000)
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
    tableName: 'remind',
})

module.exports = Remind;