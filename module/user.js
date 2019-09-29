const Sequelize = require('sequelize');
const db = require('./db.js');

const User = db().define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(11)
    },
    password: {
        type: Sequelize.STRING(11)
    },
    type: {
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
    tableName: 'user',
})

module.exports = User;