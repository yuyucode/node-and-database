require('./Admin')
require('./Class')
require('./Book')
require('./Student')
const sequelize = require('./db')



// 初始化
// sequelize.sync({ force: true }).then(() =>{
//     console.log("用户模型表刚刚(重新)创建！");
// })



// 更新
sequelize.sync({alter: true}).then(() =>{
    console.log("同步所有模型完成")
})
