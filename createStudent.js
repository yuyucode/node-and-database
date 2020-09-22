// require('./models/syncInit.js')

const studentServ = require('./services/studentServices');

studentServ.addStudent({
    name: "余榆",
    birthday: '1995-11-25',
    sex: 1,
    phone: 12345677777,
    classId: 1
})