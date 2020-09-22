const fs = require("fs");
const path = require("path")

const pathname = path.resolve(__dirname, 'src');

async function test(){
    const result = await fs.promises.stat(pathname);
    console.log(result)
}


test();