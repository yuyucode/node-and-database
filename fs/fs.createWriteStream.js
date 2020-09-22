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
    await fs.promises.writeFile(filename, readContent, {
        flag: "a",
        encoding: "utf-8",
        highWaterMark: 3
    })
    console.timeEnd("写入a")
}


async function write2() {
    const from = path.resolve(__dirname, 'src/abc.txt');
    const to = path.resolve(__dirname, 'src/b.txt');

    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to, {
        flags: "a",
        encoding: "utf-8",
        highWaterMark: 3
    })
    console.time("pipe")
    rs.pipe(ws)
    console.timeEnd("pipe")
}

write();
write2();




