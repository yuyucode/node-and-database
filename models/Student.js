const sequelize = require('./db');
const {DataTypes} = require('sequelize')

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    updatedAt: true,
    createdAt: true,
})


module.exports = Student


