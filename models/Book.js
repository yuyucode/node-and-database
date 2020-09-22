const sequelize = require('./db');
const {DataTypes} = require('sequelize')

const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl:{
        type: DataTypes.STRING,
        allowNull: true
    },
    publicDate:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true,
    timestamps: true,
})

module.exports = Book

