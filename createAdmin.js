// require('./models/syncInit.js')

const Admin =  require('./models/Admin');


// const ins = Admin.build({
//     loginId: "leiyuju2`1a`n1",
//     loginPwd: "123456121"
// })
//
// ins.save().then(()=>{
//     console.log("创建管理员成功")
// })


Admin.create({
    loginId: "lei1",
    loginPwd: "12311"
}).then(res => {
    console.log("新建示例")
    console.log(res);
})