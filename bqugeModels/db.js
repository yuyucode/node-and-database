const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('bquge', 'yuyucode', 'Y1u9y9U5!',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+8:00'
})

module.exports = sequelize