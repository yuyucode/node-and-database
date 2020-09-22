const fs = require("fs")
const path = require("path")
const filename = path.resolve(__dirname, 'src/a.txt');
const filename1 = path.resolve(__dirname, 'src/abc.txt')

// const ws = fs.createWriteStream(filename);
// const rs = fs.createReadStream(filename1);


async function write() {
    // 先读取内容
    const readContent = await fs.promises.readFile(filename1, "utf-8");
    console.time("写入a")
    await fs.promises.writeFile(filename, readContent)
    console.timeEnd("写入a")
}


async function write2() {
    const from = path.resolve(__dirname, 'src/abc.txt');
    const to = path.resolve(__dirname, 'src/b.txt');

    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to)
    rs.on("open",()=>{
        console.time("写入b")
    })
    // 读取数据
    rs.on("data", chunk => {
        // 写入数据
        let flag = ws.write(chunk);
        if(!flag){
            // 背压暂停
            rs.pause();
        }
    })

    ws.on("drain", ()=>{
        // 可以继续写了
        rs.resume();
    })

    rs.on("close",()=>{
        // 写完了
        console.log("写完了")
        console.timeEnd("写入b")
    })


}

write();
write2();




