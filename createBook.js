// require('./models/syncInit.js')




const bookServ = require('./services/bookServices')


bookServ.addBook({
    name:"鬼吹灯",
    imgUrl:"123",
    author: "南派三叔"
}).then(res => {
    console.log(res)
})
// bookServ.deleteBook(3).then(res => {
//     console.log(res);
// })
//
//
// bookServ.updateBook(2, {
//     author: "唐派三叔1"
// }).then(res => {
//     console.log(res);
// })
