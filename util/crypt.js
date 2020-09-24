// 使用对称加密算法： aes 123
// 128 位的密钥

const secret = Buffer.from("mm7h3ck87ugk9l4a");
const crypto = require("crypto");

// 准备一个iv， 随机向量
const iv = Buffer.from("7uzue51hw7dsxe0b");


exports.encrypt = function (str){
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    // 第一个参数 加密的数据
    // 第二个参数 传入加密数据是什么类型，
    // 第三个参数 加密数据之后的输出类型
    let result = cry.update(str, "utf-8", "hex");
    result += cry.final("hex"); // 输出的encoding
    return result;
}

exports.decrypt = function (str){
    // str 加密过后的字符串
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    // 第一个参数 解密的数据
    // 第二个参数 传入解密数据是什么类型，
    // 第三个参数 解密数据之后的输出类型
    let result = decry.update(str, "hex", "utf-8")
    result += decry.final("utf-8");  // 输出的encoding
    return result;
}
