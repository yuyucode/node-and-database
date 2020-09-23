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