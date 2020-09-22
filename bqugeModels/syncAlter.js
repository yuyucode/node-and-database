require('./Book')

const sequelize = require('./db')

sequelize.sync({alter: true}).then(()=>{
    console.log("同步模型")
})