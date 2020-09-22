const fs = require("fs");
const path = require("path")

const pathname = path.resolve(__dirname, 'src/txt/1.txt');
fs.promises.readFile(pathname,"utf-8").then((res) => {
    console.log(res);
})