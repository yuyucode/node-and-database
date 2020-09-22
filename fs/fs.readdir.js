const fs = require("fs");
const path = require("path")

const pathname = path.resolve(__dirname, 'src');

const end = fs.promises.readdir(pathname).then(res => {
    console.log(res)
})