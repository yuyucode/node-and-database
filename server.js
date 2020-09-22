const http = require("http")
const url = require("url")
const fs = require("fs")
const path = require("path")


function handleReq(req){
    console.log("有请求来了")
    console.log("请求方法",req.method)
    console.log("请求的地址", req.url)
    const urlObj = url.parse(req.url);
    console.log("请求地址的对象", urlObj);
    console.log("请求头", req.headers);

    console.log("流")
    let body;
    req.on("data", chunk => {
        body += chunk;
    })

    req.on("end", () => {
        console.log("请求体",body)
    })
}

const server = http.createServer((req, res) => {
    // req = IncomingMessage   res = ServerResponse
    handleReq(req);

    res.setHeader("a",1);
    res.setHeader("c", 1);

    // 消息体
    res.write("我是写入的消息体")
    res.end();
})

server.listen(6060);

server.on("listening", () => {
    console.log("监听 6060端口")
})