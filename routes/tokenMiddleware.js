

module.exports = (req, res, next) => {
    let token = req.cookies.token;
    if(!token){
        // 从header的authorization中获取
        token = req.headers.authorization;
    }
    if(!token){
        // 没有认证
        handleNoToken(req, res, next)
    }

};

// 处理没有认证的情况
function handleNoToken(req, res, next){

}