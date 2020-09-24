// // require('./models/init') // 数据库应用
//
// require('./routes/init') // 路由层应用
//
// const studentServ = require('./services/studentServices')
// // require('./mock/mockClass')
// // require('./mock/mockStudent')
//
// // require('./models/relation')


const jwt = require('jsonwebtoken')

const secrect = "余榆";
const token = jwt.sign(
    {
        id: 1,
        name: "成哥",
    },
    secrect,
    {
        expiresIn: 3600
    });

console.log(token)