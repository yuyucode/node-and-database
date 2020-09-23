# express
```最后一次更新笔记时间：2020-09-23```

![三层架构](assets/三层架构.jpg)
### 提问：为什么使用express，而不使用http模块
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

命令行安装
``` 
 局部：$ yarn add nodemon 
 全局：$ yarn add global nodemon 
```

局部安装运行
```
$ npx nodemon index.js
$ 或者自行配置package.json，更改命令
```

全局安装运行
```
需要配置环境变量
$nodemon index.js
```
### 配置
```package.json```
```json
{
 "scripts": {
     "start": "npx nodemon index"
  }
}
```
- npm run start

```nodemon.json```
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

![中间件示意图](assets/中间件示意图.jpg)


### 中间件是一个处理函数
- 当匹配到了请求后
  - 交给第一个处理中间件
  - 处理中间件中需要手动的提交给后续中间件处理
  - 想要运行后续的处理函数，需要调用第三个参数next()  
    
#### 中间件处理的细节
- 如果后续已经没有了中间件,判断有没有调用res.end() 或者res.send()   
  - 没有调用： 发送404  
  - 调用： 正常响应  
```js
app.get("/news",
    (req , res, next) =>{
       console.log("第1个处理中间件")
       next();  // 交给后续的处理中间件
    },
    (req , res, next) =>{
       console.log("第2个处理中间件")
       next();  // 交给后续的处理中间件
       // 没有调用res.end() 和 res.send()  
       // 返回 404
    }
)
```

- 如果中间件发生了错误
  - 不会停止服务器
  - 相当于调用了next(错误对象) 
  - 寻找后续的错误处理中间件，如果没有，则相应服务器内部错误 500，  
 
```js
app.get("/news",
    (req , res, next) =>{
       console.log("第1个处理中间件")
       next(new Error("自己写的报错"));  // 交给后续的错误处理中间件
    },
    (req , res, next) =>{
       console.log("第2个处理中间件")
       next();                         // 交给后续的处理中间件
    }
    // ...中间件
)
```

- 当前面的中间件，调用res.end()时  
  - 后续的中间件还是会依次调用(可以做日志记录)  
  - 后续的中间件不能再次调用res.end()和res.send()，会报错
```js
app.get("/news",
    (req , res, next) =>{
       console.log("第1个处理中间件")
       res.status(200)   
       res.end();
       next();  // 交给后续的处理中间件
    },
    (req , res, next) =>{
       //会运行，可以做日志记录
       console.log("第2个处理中间件")  
       next();  // 交给后续的处理中间件
    }
    // ...中间件
)
```

#### 处理错误的中间件

使用```app.use()```方法
 - app.use,不管任何形式的请求，都会调用
 - app.use,采用模糊匹配规则，不和app.get 和app.post 等方法请求一样是精确匹配
```js
// errorMiddleware.js
module.exports = (err, req, res, next) => {
    if (err) {
        // 发生了错误
        const errObj = {
            code: 500,
            msg: err instanceof Error ? err.message : err
        }
        res.status(500).send(errObj)
    }
    else {
        next();
    }
}

// init.js  
// 处理错误的中间件，一般放到最后
// /news 为基本路径， 可以匹配/news、 /newst 、/news/fd 等正则包含/news的路径，不能匹配/n等其他路径
app.use('/news',require('./errorMiidewear'))

// 或者
// 匹配任何路径
app.use(require('./errorMiidewear'))
```

#### 处理静态资源的中间件
```staticMiddleware.js```
```js
// 静态资源

module.exports = (req, res, next) =>{
    if(req.path.startsWith('/api')){
        // 说明你请求的是api接口
        next()
    }else {
        // 判断静态资源是否存在

        if(静态资源){
            res.send("静态资源")
        }else{
            next();
        }
    }
}
```

## express常用中间件

#### express.static() 

- 静态资源服务器
- https://www.expressjs.com.cn/5x/api.html#express.static
```js
// dirname 为静态资源目录

/**
 * 下面的这段代码的作用：
 * 当请求时，会根据请求路径，从指定的目录中寻找是否存在改文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
 * 默认情况下，如果映射的结果是一个目录，则会自动还是用idnex.html文件
 */
app.use(express.static(dirname))

/**
 * 下面的代码作用：
 * 第一个参数为基础路径，模糊匹配 /next等
 * 第二个参数为静态资源陌路
 */
app.use("/next",express.static(dirname))
```



#### express.urlencoded() 

- 获取请求头，匹配类型为 "application/x-www-form-urlencoded"格式  
- https://www.expressjs.com.cn/5x/api.html#express.urlencoded
```js
app.use(
    express.urlencoded({
            extended: true //使用新的库，必须设置
        }
    )
)
```
- 手写
```js
/**
 * 手写 express.urlencoded
 * @param req
 * @param res
 * @param next
 */
const qs = require("querystring")
module.exports = (req, res, next) =>{
    if((req.headers["content-type"]) === "application/x-www-form-urlencoded"){
        // 自行解析消息体
        let result = "";
        req.on("data", chunk =>{
            result += chunk.toString("utf-8")
        });
        req.on("end", ()=>{
            // 把result解析成一个对象，然后放到req.body 
            req.body = qs.parse(result);
            next();
        })
    }else{
        next();
    }

}
```


#### express.json()

- https://www.expressjs.com.cn/5x/api.html#express.json
- 解析JSON格式的消息体
```js
app.use(express.json())
```

## express路由

#### express.router()

- https://www.expressjs.com.cn/5x/api.html#express.router
```js
// routes/init.js 
// 处理api 的请求
app.use('/api/student', require('./api/student'));

// routes/api/student.js
// 设置路由
const express = require('express')
const router = express.Router();

// get -> /api/student
router.get('/', async (req, res) => {
    console.log("获取学生")
    const info = {
        page:req.query.page || 1,
        limit: req.query.limit || 10,
        sex: req.query.sex || -1,
        name: req.query.name || ""
    }
    const data = await studentServ.getStudent(info);
    
    // 举个例子，可以自己封装
    res.send({
        code: 0,
        msg: "",
        data
    })
});
// get -> /api/student/xxx
router.get('/:id', (req, res) => {
    console.log("获取单个学生")
});

// post -> /api/student
router.post('/', (req, res) => {
    console.log("添加学生")
});

// delete ->/api/student:id
router.delete('/:id', (req, res) => {
    console.log('删除学生')
})

// put -> /api/student/xxx
router.put("/:id", (req, res) => {
    console.log("修改学生")
})

module.exports = router
```

## cookie的基本概念
### 一个不大不小的问题

假设服务器有一个接口，通过请求这个接口，可以添加一个管理员

但是，不是任何人都有权力做这种操作的

那么服务器如何知道请求接口的人是有权力的呢？

答案是：只有登录过的管理员才能做这种操作

可问题是，客户端和服务器的传输使用的是http协议，http协议是无状态的，什么叫无状态，就是**服务器不知道这一次请求的人，跟之前登录请求成功的人是不是同一个人**

![](http://mdrs.yuanjin.tech/img/image-20200417161014030.png)

![](http://mdrs.yuanjin.tech/img/image-20200417161244373.png)

由于http协议的无状态，服务器**忘记**了之前的所有请求，它无法确定这一次请求的客户端，就是之前登录成功的那个客户端。

> 你可以把服务器想象成有着严重脸盲症的东哥，他没有办法分清楚跟他说话的人之前做过什么

于是，服务器想了一个办法

它按照下面的流程来认证客户端的身份

1. 客户端登录成功后，服务器会给客户端一个出入证（令牌 token）
2. 后续客户端的每次请求，都必须要附带这个出入证（令牌 token）

![](http://mdrs.yuanjin.tech/img/image-20200417161950450.png)

服务器发扬了认证不认人的优良传统，就可以很轻松的识别身份了。

但是，用户不可能只在一个网站登录，于是客户端会收到来自各个网站的出入证，因此，就要求客户端要有一个类似于卡包的东西，能够具备下面的功能：

1. **能够存放多个出入证**。这些出入证来自不同的网站，也可能是一个网站有多个出入证，分别用于出入不同的地方
2. **能够自动出示出入证**。客户端在访问不同的网站时，能够自动的把对应的出入证附带请求发送出去。
3. **正确的出示出入证**。客户端不能将肯德基的出入证发送给麦当劳。
4. **管理出入证的有效期**。客户端要能够自动的发现那些已经过期的出入证，并把它从卡包内移除。

能够满足上面所有要求的，就是cookie

cookie类似于一个卡包，专门用于存放各种出入证，并有着一套机制来自动管理这些证件。

卡包内的每一张卡片，称之为**一个cookie**。

### cookie的组成

cookie是浏览器中特有的一个概念，它就像浏览器的专属卡包，管理着各个网站的身份信息。

每个cookie就相当于是属于某个网站的一个卡片，它记录了下面的信息：

- key：键，比如「身份编号」
- value：值，比如袁小进的身份编号「14563D1550F2F76D69ECBF4DD54ABC95」，这有点像卡片的条形码，当然，它可以是任何信息
- domain：域，表达这个cookie是属于哪个网站的，比如`yuanjin.tech`，表示这个cookie是属于`yuanjin.tech`这个网站的
- path：路径，表达这个cookie是属于该网站的哪个基路径的，就好比是同一家公司不同部门会颁发不同的出入证。比如`/news`，表示这个cookie属于`/news`这个路径的。（后续详细解释）
- secure：是否使用安全传输（后续详细解释）
- expire：过期时间，表示该cookie在什么时候过期

当浏览器向服务器发送一个请求的时候，它会瞄一眼自己的卡包，看看哪些卡片适合附带捎给服务器

如果一个cookie**同时满足**以下条件，则这个cookie会被附带到请求中

- cookie没有过期
- cookie中的域和这次请求的域是匹配的
  - 比如cookie中的域是`yuanjin.tech`，则可以匹配的请求域是`yuanjin.tech`、`www.yuanjin.tech`、`blogs.yuanjin.tech`等等
  - 比如cookie中的域是`www.yuanjin.tech`，则只能匹配`www.yuanjin.tech`这样的请求域
  - cookie是不在乎端口的，只要域匹配即可
- cookie中的path和这次请求的path是匹配的
  - 比如cookie中的path是`/news`，则可以匹配的请求路径可以是`/news`、`/news/detail`、`/news/a/b/c`等等，但不能匹配`/blogs`
  - 如果cookie的path是`/`，可以想象，能够匹配所有的路径
- 验证cookie的安全传输
  - 如果cookie的secure属性是true，则请求协议必须是`https`，否则不会发送该cookie
  - 如果cookie的secure属性是false，则请求协议可以是`http`，也可以是`https`

如果一个cookie满足了上述的所有条件，则浏览器会把它自动加入到这次请求中

具体加入的方式是，**浏览器会将符合条件的cookie，自动放置到请求头中**，例如，当我在浏览器中访问百度的时候，它在请求头中附带了下面的cookie：

![](http://mdrs.yuanjin.tech/img/image-20200417170328584.png)

看到打马赛克的地方了吗？这部分就是通过请求头`cookie`发送到服务器的，它的格式是`键=值; 键=值; 键=值; ...`，每一个键值对就是一个符合条件的cookie。

**cookie中包含了重要的身份信息，永远不要把你的cookie泄露给别人！！！**否则，他人就拿到了你的证件，有了证件，就具备了为所欲为的可能性。

### 如何设置cookie

由于cookie是保存在浏览器端的，同时，很多证件又是服务器颁发的

所以，cookie的设置有两种模式：

- 服务器响应：这种模式是非常普遍的，当服务器决定给客户端颁发一个证件时，它会在响应的消息中包含cookie，浏览器会自动的把cookie保存到卡包中
- 客户端自行设置：这种模式少见一些，不过也有可能会发生，比如用户关闭了某个广告，并选择了「以后不要再弹出」，此时就可以把这种小信息直接通过浏览器的JS代码保存到cookie中。后续请求服务器时，服务器会看到客户端不想要再次弹出广告的cookie，于是就不会再发送广告过来了。

#### 服务器端设置cookie

服务器可以通过设置响应头，来告诉浏览器应该如何设置cookie

响应头按照下面的格式设置：

```yaml
set-cookie: cookie1
set-cookie: cookie2
set-cookie: cookie3
...
```

通过这种模式，就可以在一次响应中设置多个cookie了，具体设置多少个cookie，设置什么cookie，根据你的需要自行处理

其中，每个cookie的格式如下：

```
键=值; path=?; domain=?; expire=?; max-age=?; secure; httponly
```

每个cookie除了键值对是必须要设置的，其他的属性都是可选的，并且顺序不限

当这样的响应头到达客户端后，**浏览器会自动的将cookie保存到卡包中，如果卡包中已经存在一模一样的卡片（其他key、path、domain相同），则会自动的覆盖之前的设置**。

下面，依次说明每个属性值：

- **path**：设置cookie的路径。如果不设置，浏览器会将其自动设置为当前请求的路径。比如，浏览器请求的地址是`/login`，服务器响应了一个`set-cookie: a=1`，浏览器会将该cookie的path设置为请求的路径`/login`
- **domain**：设置cookie的域。如果不设置，浏览器会自动将其设置为当前的请求域，比如，浏览器请求的地址是`http://www.yuanjin.tech`，服务器响应了一个`set-cookie: a=1`，浏览器会将该cookie的domain设置为请求的域`www.yuanjin.tech`
  - 这里值得注意的是，如果服务器响应了一个无效的域，浏览器是不认的
  - 什么是无效的域？就是响应的域连根域都不一样。比如，浏览器请求的域是`yuanjin.tech`，服务器响应的cookie是`set-cookie: a=1; domain=baidu.com`，这样的域浏览器是不认的。
  - 如果浏览器连这样的情况都允许，就意味着张三的服务器，有权利给用户一个cookie，用于访问李四的服务器，这会造成很多安全性的问题
- **expire**：设置cookie的过期时间。这里必须是一个有效的GMT时间，即格林威治标准时间字符串，比如`Fri, 17 Apr 2020 09:35:59 GMT`，表示格林威治时间的`2020-04-17 09:35:59`，即北京时间的`2020-04-17 17:35:59`。当客户端的时间达到这个时间点后，会自动销毁该cookie。
- **max-age**：设置cookie的相对有效期。expire和max-age通常仅设置一个即可。比如设置`max-age`为`1000`，浏览器在添加cookie时，会自动设置它的`expire`为当前时间加上1000秒，作为过期时间。
  - 如果不设置expire，又没有设置max-age，则表示会话结束后过期。
  - 对于大部分浏览器而言，关闭所有浏览器窗口意味着会话结束。
- **secure**：设置cookie是否是安全连接。如果设置了该值，则表示该cookie后续只能随着`https`请求发送。如果不设置，则表示该cookie会随着所有请求发送。
- **httponly**：设置cookie是否仅能用于传输。如果设置了该值，表示该cookie仅能用于传输，而不允许在客户端通过JS获取，这对防止跨站脚本攻击（XSS）会很有用。 
  - 关于如何通过JS获取，后续会讲解
  - 关于什么是XSS，不在本文讨论范围

下面来一个例子，客户端通过`post`请求服务器`http://yuanjin.tech/login`，并在消息体中给予了账号和密码，服务器验证登录成功后，在响应头中加入了以下内容：

```
set-cookie: token=123456; path=/; max-age=3600; httponly
```

当该响应到达浏览器后，浏览器会创建下面的cookie：

```yaml
key: token
value: 123456
domain: yuanjin.tech
path: /
expire: 2020-04-17 18:55:00 #假设当前时间是2020-04-17 17:55:00
secure: false  #任何请求都可以附带这个cookie，只要满足其他要求
httponly: true #不允许JS获取该cookie
```

于是，随着浏览器后续对服务器的请求，只要满足要求，这个cookie就会被附带到请求头中传给服务器：

```yaml
cookie: token=123456; 其他cookie...
```

现在，还剩下最后一个问题，就是如何删除浏览器的一个cookie呢？

如果要删除浏览器的cookie，只需要让服务器响应一个同样的域、同样的路径、同样的key，只是时间过期的cookie即可

**所以，删除cookie其实就是修改cookie**

下面的响应会让浏览器删除`token`

```yaml
cookie: token=; domain=yuanjin.tech; path=/; max-age=-1
```

浏览器按照要求修改了cookie后，会发现cookie已经过期，于是自然就会删除了。

> 无论是修改还是删除，都要注意cookie的域和路径，因为完全可能存在域或路径不同，但key相同的cookie
>
> 因此无法仅通过key确定是哪一个cookie

#### 客户端设置cookie

既然cookie是存放在浏览器端的，所以浏览器向JS公开了接口，让其可以设置cookie

```js
document.cookie = "键=值; path=?; domain=?; expire=?; max-age=?; secure";
```

可以看出，在客户端设置cookie，和服务器设置cookie的格式一样，只是有下面的不同

- 没有httponly。因为httponly本来就是为了限制在客户端访问的，既然你是在客户端配置，自然失去了限制的意义。
- path的默认值。在服务器端设置cookie时，如果没有写path，使用的是请求的path。而在客户端设置cookie时，也许根本没有请求发生。因此，path在客户端设置时的默认值是当前网页的path
- domain的默认值。和path同理，客户端设置时的默认值是当前网页的domain
- 其他：一样
- 删除cookie：和服务器也一样，修改cookie的过期时间即可

### 总结

以上，就是cookie原理部分的内容。

如果把它用于登录场景，就是如下的流程：

**登录请求**

1. 浏览器发送请求到服务器，附带账号密码
2. 服务器验证账号密码是否正确，如果不正确，响应错误，如果正确，在响应头中设置cookie，附带登录认证信息（至于登录认证信息是设么样的，如何设计，要考虑哪些问题，就是另一个话题了，可以百度 jwt）
3. 客户端收到cookie，浏览器自动记录下来



**后续请求**

1. 浏览器发送请求到服务器，希望添加一个管理员，并将cookie自动附带到请求中
2. 服务器先获取cookie，验证cookie中的信息是否正确，如果不正确，不予以操作，如果正确，完成正常的业务流程



