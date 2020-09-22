const Book = require('../models/Book')


/**
 * 创建书籍
 * @param bookInfo  {{name: string, imgUrl: string, author: string}}
 * @return {Promise<*>}
 */
exports.addBook  = async function (bookInfo){
    const ins = await Book.create(bookInfo);
    return ins.toJSON();
}

/**
 * 删除书籍
 * @param bookId  书籍ID
 * @return {Promise<*>}
 */
exports.deleteBook =  async function (bookId){
    return await Book.destroy({
        where:{
            id: bookId
        }
    })
}


/**
 * 修改书籍
 * @param bookId
 * @param bookInfo
 * @return {Promise<void>}
 */
exports.updateBook = async function (bookId ,bookInfo){
    await Book.update(bookInfo, {
        where:{
            id: bookId
        }
    })
}
