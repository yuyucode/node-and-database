const Book = require('../Book')

exports.addBook = async function (bookObj){
    const ins = await Book.create(bookObj);
    return ins.toJSON()
}