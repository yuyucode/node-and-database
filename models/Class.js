const sequelize = require('./db');
const {DataTypes} = require('sequelize')
const Student  = require('./Student')
const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publicDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
    timestamps: true,
})
Class.hasMany(Student);
Student.belongsTo(Class)


module.exports = Class


