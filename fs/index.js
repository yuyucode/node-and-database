const fs = require("fs")
const path = require("path")
const filename = path.resolve(__dirname, 'src/src.txt');

const rs = fs.createReadStream(filename, {
    autoClose: true,
    encoding: "utf-8",
    highWaterMark: 1,
});

// 文件找到，并且打开
rs.on("open",()=>{
    console.log("文件打开了")
})


// 文件没找到，报错
rs.on("error", ()=>{
    console.log("文件找不到")
})

// 读取文件内容过程
rs.on("data",chunk=>{
    console.log("内容：",chunk)
})

// 读取文件内容完毕后触发
rs.on("end", ()=>{
    console.log("读取完毕")
})



// 文件读取完毕后关闭 需要调用读取 data
rs.on("close", ()=>{
    console.log("文件读取完毕后，关闭")
})



