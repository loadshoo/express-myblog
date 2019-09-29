const Sequelize = require('sequelize');

function db(database='39health', username='root', password='123456', host='127.0.0.1', dialect='mysql') {
    return new Sequelize(database, username, password, {
        host: host,
        dialect: dialect
    });
}

module.exports = db;