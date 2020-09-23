# express
```最后一次更新笔记时间：2020-09-23```

## 提问：为什么使用express，而不使用http模块
1、根据不同的请求路径、请求方法、做不同的事情，处理起来比较麻烦  
2、读取请求体和写入响应体是通过流的方式，比较麻烦
```js
const http =require('http')
http.createServer((req, res) =>{
     // 复杂的代码处理请求
})
```

### 第三方库 
- express 
  -  生态环境完整   
  -  民间中文网：https://www.expressjs.com.cn/  
  
- koa2 
  -  基础先进性和提供的API友好性

### 创建一个express应用
```js
const express = require('express');
const app = express();  // 创建一个express应用

// app实际上是一个函数用于处理请求的函数
const port = 9527;  // 监听9527窗口
app.listen(port, () => {
    console.log("Listen 9527 server")
})

// 配置一个请求映射，如果请求方法和请求的路径均满足匹配，交给处理函数进行处理
// app.请求方法("请求路径",处理函数)

// 匹配任何get处理请求
app.get('*', (req, res)=>{
    // req 和 res 是被express封装过的   
  
    res.send("hello但21321是分都是")  // 响应给客户端
})
```

## nodemon 自动重启工具

### 安装

#### 命令行安装
``` 
 局部：$ yarn add nodemon 
 全局：$ yarn add global nodemon 
```

#### 局部安装运行
```
$ npx nodemon index.js
$ 或者自行配置package.json，更改命令
```

#### 全局安装运行
```
需要配置环境变量
$nodemon index.js
```
### 配置
#### package.json 配置文件

```json
{
 "scripts": {
     "start": "npx nodemon index"
  }
}
```
- 运行: npm run start

#### nodemon.json 配置文件
```json
{
  "env": {
    "NODE_ENV": "development"
  },
  "watch": ["*.json", "*.js"],
  "ignore": ["node_modules", ".idea", "yarn.lock", "package*.json"]
}
```
- watch: 监听的文件类型
- env: 启动的环境
- ignore: 忽略的文件

## express 中间件