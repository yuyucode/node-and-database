const fs = require("fs");
const path = require("path")

const dirname = path.resolve(__dirname, 'src/d.1');


async function test(){
    await fs.promises.mkdir(dirname);
    console.log("创建成功")
}

test();