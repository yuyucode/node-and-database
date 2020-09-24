const secrect = "yuyu"; //密钥
const cookieKey = "token"
const jwt =require("jsonwebtoken")
// 颁发jwt
exports.publish = function (res, maxAge = 3600 * 24, info={}){
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge
    });
    // 添加到cookie 原生就有
    res.cookie(cookieKey, token, {
        maxAge: maxAge * 1000,
        path:"/"
    })

    // 添加其他传输
    res.header('authorization', token)
}

// 认证jwt


exports.verify = function (req){
    let token;
    // 先尝试从cookie中获取
    token = req.cookies[cookieKey];

    // cookie没有
    if(!token){
        // 尝试从header中获取
        token = req.headers.authorization
        if(!token){
            // 还是没有token
            return null
        }
        token = token.split(" ");
        token = token.length === 1 ? token[0] : token [1];
    }
    try{
        return jwt.verify(token, secrect)
    }catch {
        return  null
    }
}