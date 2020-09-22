const mysql = require('mysql2/promise');

async function test(){
    // 创建数据库连接
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "yuyucode",
        password: "Y1u9y9U5!",
        database: "work"
    })
    const [results] = await connection.query("SELECT * FROM `user`;")
    console.log(results)
    connection.end()
}

test();


// 获取
// connection.query(
//     'SELECT * FROM `company` ;',
//     function (err, results){
//         console.log(results);
//     }
// )


// 新增
// connection.query(
//     'INSERT INTO company(`name`,location, buildDate) VALUES("abc","阿啥的",CURRENT_DATE())',
//     (err, results) =>{
//         console.log(results)
//     }
// )

// 修改的
// connection.query(
//     'UPDATE company SET `name` = "我是修改的" WHERE id = 4',
//     (err, result) => {
//         console.log(result)
//     }
// )

// 删除的
// connection.query(
//     'DELETE FROM company WHERE id = 4',
//     (err, result) =>{
//         console.log(result)
//     }
// )
