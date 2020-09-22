require('./Book')

const sequelize = require('./db')


sequelize.sync({force:true}).then(()=>{
    console.log("初始化模型")
})