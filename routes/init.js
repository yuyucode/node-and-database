const express = require('express');
const app = express();  // 创建一个express应用


// 映射public目录中的静态资源

// 加入session中间件


// 加入express的中间件，  cookie-parser中间件


// 解析 application/x-www-form-urlencoded 格式的请求体


// 解析 application/json 格式的请求体


// 处理api的请求


// 处理错误的中间件
app.listen( 9527, () => {
    console.log("Listen 9527 server")
})






