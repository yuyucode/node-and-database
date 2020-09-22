const http = require("http");
const URL = require("url");
const path = require("path")
const fs = require('fs');


async function getStat(filename) {
    try {
        return await fs.promises.stat(filename);
    } catch {
        return null
    }
}

/**
 * 要处理的文件内容
 * @param url
 * @return {Promise<null>}
 */

async function urlPathFile(url) {
    const urlObj = URL.parse(url)
    let filename;
    filename = path.resolve(__dirname, 'public', urlObj.pathname.substr(1));
    let stat = await getStat(filename);
    console.log("第一次状态", stat)
    if (!stat) {
        //文件不存在

    } else if (stat.isDirectory()) {
        // 存在目录
        console.log("存在目录")
        filename = path.resolve(
            __dirname,
            'public',
            urlObj.pathname.substr(1),
            'index.html'
        );
        stat = await getStat(filename)
        if (!stat) {
            return null
        } else {
            // return fs.promises.readFile(filename);
            return  filename
        }
    } else {
        // 正常的文件
        // return fs.promises.readFile(filename);
        return  filename
    }

}


// async function handler(req, res) {
//     // 对服务器发送的文件路径请求，验证其正确,返回一个文件路径
//     const file = await urlPathFile(req.url)
//     console.log(file)
//     if (file) {
//         console.time("方式1")
//         res.write(file);
//         console.timeEnd("方式1")
//     } else {
//         res.statusCode = 400;
//         res.write("未找到页码 0-0")
//     }
//     res.end();
// }

async function handler(req, res) {
    // 对服务器发送的文件路径请求，验证其正确,返回一个文件路径
    const file = await urlPathFile(req.url)
    console.log(file)
    if (file) {
        let rs = fs.createReadStream(file, {
            encoding: "utf-8"
        })
        let flag;
        rs.on("data",chunk => {
            flag = res.write(chunk, "utf-8");
            console.log(flag)
            if(!flag){
                console.log("调入")
                rs.pause();
            }
        })

        res.on("drain",()=>{
            rs.resume();
        })
        res.end();
    } else {
        res.statusCode = 400;
        res.write("未找到页码 0-0")
        res.end();
    }
}



const server = http.createServer(handler);


server.listen(6080);

server.on("listening", () => {
    console.log("监听6080端口");
})



