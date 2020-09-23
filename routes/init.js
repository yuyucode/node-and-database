const express = require('express');
const app = express();  // 创建一个express应用


app.listen( 9527, () => {
    console.log("Listen 9527 server")
})


// 发送请求

app.use("/api/student",require('./api/student'))





