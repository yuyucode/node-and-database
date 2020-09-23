const express = require('express')
const router = express.Router();
const studentServ = require('../../services/studentServices');
// get -> /api/student
router.get('/', async (req, res) => {
    console.log("获取学生")
    const info = {
        page:req.query.page || 1,
        limit: req.query.limit || 10,
        sex: req.query.sex || -1,
        name: req.query.name || ""
    }
    const data = await studentServ.getStudent(info);
    console.log(data)
    // 举个例子，可以自己封装
    res.send({
        code: 0,
        msg: "",
        data
    })

});
// get -> /api/student/xxx
router.get('/:id', (req, res) => {
    console.log("获取单个学生")
});

// post -> /api/student
router.post('/', (req, res) => {
    console.log("添加学生")
});

// delete ->/api/student:id
router.delete('/:id', (req, res) => {
    console.log('删除学生')
})

// put -> /api/student/xxx
router.put("/:id", (req, res) => {
    console.log("修改学生")
})

module.exports = router
