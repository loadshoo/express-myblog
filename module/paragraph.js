const Sequelize = require('sequelize');
const db = require('./db.js');

const Paragraph = db().define('paragraph', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING(8)
    },
    content: {
        type: Sequelize.TEXT,
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
    tableName: 'paragraph',
})

module.exports = Paragraph;