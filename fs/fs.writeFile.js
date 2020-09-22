const fs = require("fs");
const path = require("path")

const pathname = path.resolve(__dirname, 'src/txt/1.txt');


async function test (){
    await fs.promises.writeFile(pathname,"我是天蝎的内容",{
        flag: "a"
    });
    console.log("写入成功");
}

test();
