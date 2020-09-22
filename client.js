const http = require("http")
const fs = require("fs")
const path = require("path")



const request = http.request("http://yuanjin.tech:5050/api/movie",{
    method: "GET"
},res => {
    // 通过 客户端向远程服务器请求返回的结果  IncomingMessage对象
    console.log("响应状态",res.statusCode)
    console.log("响应头", res.headers)

    res.on("data", chunk => {
        console.log(chunk.toString("utf-8"))
    })
})



request.end();