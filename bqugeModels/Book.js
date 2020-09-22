const sequelize = require('./db')
const {DataTypes} = require('sequelize')
const Book = sequelize.define("Book", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    paranoid: true,
    timestamps: true,
})

module.exports = Book