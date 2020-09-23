/**
 *  引入每个模型
 */

require('./Admin')
require('./Class')
require('./Book')
require('./Student')
const sequelize = require('./db')

/**
 * 设置模型关系
 */

require('./relation')


/**
 * 同步数据库
 */


syncCreate();  // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// syncForce();   // 慎用：会重新创建关联： 将创建表,如果表已经存在,则将其首先删除
// syncAlter();  //  慎用：会重新创建关联： 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.






// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
async function syncCreate() {
    await sequelize.sync()
    console.log("如果表不存在,则创建该表(如果已经存在,则不执行任何操作")
}


// 将创建表,如果表已经存在,则将其首先删除
async function syncForce() {
    await sequelize.sync({force: true})
    console.log("用户模型表刚刚(重新)创建！");
}

//  这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
async function syncAlter() {
    await sequelize.sync({alter: true});
    console.log("同步所有模型完成")
}