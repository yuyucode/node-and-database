const Admin = require('../models/Admin');


/**
 * 添加用户
 * @param adminObj {{loginId: string, loginPwd: string}}
 * @return {Promise<*>}
 */
exports.addAdmin = async function (adminObj){
    // 判断参数的各种合理性，检查是否存在
    // 方式1
    // const ins = await Admin.build(adminObj);
    // await ins.save();


    // 方式2
    const ins = await Admin.create(adminObj);
    console.log("创建成功");
    return ins.toJSON()
}


/**
 * 删除用户
 * @param adminId
 * @return {Promise<*>}
 */
exports.deleteAdmin = async function (adminId){
    // 方式1 得到实例 -> 删除实例 (前提条件是有实例)
    // const ins = await Admin.findByPk(adminId);
    // if(ins){
    //     await ins.destroy();
    // }

    // 方式2
    const result = await Admin.destroy({
        where: {
            id: adminId
        }
    })
    return result;// 受影响的行数个数
}

/**
 * 修改用户信息，只能修改密码
 * @param adminObj
 * @param id
 * @return {Promise<*>}
 */
exports.updateAdmin = async function (adminObj, id){
    // 修改用户信息，只能修改密码，需要自己做判断
    // 方式1 得到实例 -> 修改实例 (前提条件是有实例)
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId
    // // 保存
    // await ins.save();

    // 方式2
    const result = await Admin.update(adminObj,{
        // 修改的条件
        where:{
            id  // id: id  => id = id
        }
    })
    return result ; // 受影响的行数个数
}
