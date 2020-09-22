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

    if (file) {
        const rs = await fs.createReadStream(file); // 创建一个读取流
        // 判断请求的文件路径是否存在

        // res.write(rs)
        try{
            let ws =  rs.pipe(res);
            console.log(ws)
            console.log(res)
            res.write(Buffer.from(ws))
            res.end();
        }catch (err){
            console.log(err)
        }


        let flag;
        // rs.on("data", chunk => {
        //     // 写入到 响应体
        //     flag = res.write(chunk);
        //     // if(flag){
        //     //     rs.pause();
        //     // }
        // })
        // rs.on("")

        // rs.on("end",()=>{
        //     // 完成读取流，调用响应结束
        //     res.end();
        // })
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



