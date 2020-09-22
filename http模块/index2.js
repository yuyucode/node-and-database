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
    let notFile = {}
    if (!stat) {
        //文件不存在

        return null
    } else if (stat.isDirectory()) {
        // 存在目录
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
            return filename;
        }
    } else {
        // 正常的文件
        return filename;
    }

}


async function handler(req, res) {
    // 对服务器发送的文件路径请求，验证其正确,返回一个文件路径
    const file = await urlPathFile(req.url)
    const rs = fs.createReadStream(file); // 创建一个读取流

    // 判断请求的文件路径是否存在
    if(file){
        // 存在
        console.log("存在文件")
        rs.on("data", chunk => {
            // 写入到 响应体
            res.write(chunk);
        })
        rs.on("end",()=>{
            // 完成读取流，调用响应结束
            res.end();
        })
    }else {
        // 不存在
        console.log("不存在文件")
        res.statusCode = 404;
        res.write("你访问的路径不正确");
        res.end();
    }
}


const server = http.createServer(handler);


server.listen(6080);

server.on("listening", () => {
    console.log("监听6080端口");
})



