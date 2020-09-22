const Class = require('../models/Class');


/**
 * 创建班级
 * @param classInfo  {{name:string}}
 * @return {Promise<*>}
 */
exports.addClass = async function (classInfo = {}){
    const ins  = await Class.create(classInfo);
    return ins.toJSON();
}

/**
 * 删除班级
 * @param classId  {Number|Null}
 * @return {Promise<*>}
 */
exports.deleteClass = async function (classId = null){
    return await Class.destroy({
        where: {
            id: classId
        }
    })
}

/**
 * @修改班级
 * @param classId   {classId}
 * @param classInfo  {{name:string}}
 * @return {Promise<*>}
 */
exports.updateClass = async function (classId, classInfo){
    return await Class.update(classInfo,{
        where: {
            id: classId
        }
    })
}