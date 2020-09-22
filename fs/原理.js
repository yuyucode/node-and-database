function require(modulePath){
    // 1、 把路径转换成绝对路径
    // 2、 判断模块有木有缓存
    if(require.cache["绝对路径"]){
        return require.cache["绝对路径"].result;
    }
    // 3、读取文件内容
    // 4、包裹到一个函数中
    function _temp(module, exports, require ,__dirname, __filename){
        console.log("当前模块路径", __dirname);

        console.log("当前模块文件", __filename);

        exports.a= 1;          // exports
        module.exports = {     //
            b:2,
            c:3
        }

        this.m = 5
    }

    // 6、 创建module对象
    module.exports = {};
    const exports = module.exports;

    _temp.call(module.exports, module, exports, require, module.path, module.filename)


}

require.cache = {}