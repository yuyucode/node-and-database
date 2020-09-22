const net = require('net')

const server = net.createServer({});
server.listen(9090);

server.on("listening", () => {
    console.log("监听")
})

server.on("connection", socket => {
    console.log("有客户端链接服务器")

    socket.on('data', chunk => {
            console.log(chunk.toString("utf-8"));
            socket.write(`HTTP/1.1 200 OK

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>你好啊</h1>
</body>
</html>`)
            socket.end();
        }
    )

    server.on("close", () => {
        console.log("关闭了")
    })
})

