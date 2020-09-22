// require('./models/syncInit.js')

const studentServ = require('./services/classServices');

studentServ.addClass({
    name: "班级"
}).then(res => {
    console.log(res);
})


// studentServ.updateClass(4, {
//     name: "修改4班"
// }).then(() => {
//     console.log("修改完成")
// });