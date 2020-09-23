const Student = require('../models/Student')


exports.getStudent = async function ({page, limit, sex, name}){
    const ins = await Student.findAll({
        attributes:['id','name','birthday','phone','sex']
    });
    // console.log(ins)
    return ins
}


/**
 * 添加数据
 * @param studentInfoObj  {{birthday: string, classId: number, phone: number, sex: number, name: string, classId: Number}}
 * @return {Promise<*>}
 */
exports.addStudent = async function (studentInfoObj = {}){
    console.log(studentInfoObj)
    const ins = await Student.create(studentInfoObj,{

    });
    return ins.toJSON();
}

/**
 * 删除数据
 * @param id
 * @return {Promise<*>}
 */
exports.deleteStudent = async function (id) {
    return await Student.destroy({
        where: {
            id,
        },
    });
};


/**
 * 修改数据
 * @param id {string}
 * @param obj {Object}
 * @return {Promise<*>}
 */
exports.updateStudent = async function (id, obj) {
    return await Student.update(obj, {
        where: {
            id,
        },
    });
};