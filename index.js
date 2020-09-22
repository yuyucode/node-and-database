const express = require('express');
const app = express();  // 创建一个express应用

// app实际上是一个函数用于处理请求的函数

const port = 9527
app.listen(port, () => {
    console.log("Listen 9527 server")
})


app.get('*', (req, res)=>{
    console.log(req.headers);
    res.send("hello但21321是分都是")
})