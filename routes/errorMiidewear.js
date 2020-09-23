// 处理错误的中间件
const qs = require("querystring")
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