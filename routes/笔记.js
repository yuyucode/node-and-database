const express = require('express');
const app = express();  // 创建一个express应用

// app实际上是一个函数用于处理请求的函数

const port = 9527;  // 监听9527窗口
app.listen(port, () => {
    console.log("Listen 9527 server")
})

/**
 * 下面的这段代码的作用：
 * 当请求时，会根据请求路径，从指定的目录中寻找是否存在改文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
 */
app.use(express.static(dirname))


app.use(
    express.urlencoded({
            extended: true //使用新的库，必须设置
        }
    )
)

app.use(express.json())