const sequelize = require('./db');
const {DataTypes} = require('sequelize')

const Admin =  sequelize.define('Admin', {
    loginId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginPwd:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    updatedAt: false,
    createdAt: false,
    paranoid: true,
    timestamps: true,
})

module.exports = Admin;


