// require('./models/init'); // 数据库应用

                           // 服务层

// require('./routes/init'); // 路由层应用



const {encrypt, decrypt} = require('./util/crypt');

const end = encrypt("123");
console.log(end);

const end1 = decrypt(end);
console.log(end1)
