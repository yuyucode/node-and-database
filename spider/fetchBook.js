// 抓取豆瓣读书中的信息
const axios = require("axios").default;
const cheerio = require('cheerio')
const Book = require('../models/Book')

/**
 * 获取豆瓣网页的html
 * @return {Promise<any>}
 */
async function getBooksHTML() {
    const res = await axios.get('https://book.douban.com/latest?icn=index-latestbook-all')
    return res.data;
}


/**
 * 得到书本的所有详情页地址
 * @return {Promise<[]>}
 */
async function getBookLinks() {
    const html = await getBooksHTML();
    const $ = cheerio.load(html)
    const as = $('#wrapper  a.cover');
    const links = as.map((i, ele) => {
        return ele.attribs['href'];
    });
    return Array.from(links);
}


/**
 * 根据地址，得到书本的详情页数据
 * @param bookUrl
 * @return {Promise<{imgUrl: string, author: string, name: string, publicDate: string}>}
 */
async function getBookInfo(bookUrl) {
    const html = await axios.get(bookUrl);
    const $ = cheerio.load(html.data);
    const name = $('#wrapper h1 span').text();
    const imgUrl = $('#mainpic .nbg img').attr("src");
    const authorSpan = $('#info')
    const author = $("#info").children().find("a").text();
    const spans = $("#info span.pl").filter((i, ele) => {
        return $(ele).text().includes("出版年")
    })
    const publicDate = spans[0].nextSibling.nodeValue.trim();
    return {
        name,
        imgUrl,
        author,
        publicDate
    }

}


/**
 * 获取所有书本的数据
 * @return {Promise<{imgUrl: string, author: string, name: string, publicDate: string}[]>}
 */
async function getFetchBooksInfo() {
    const links = await getBookLinks()
    const books = links.map(src =>{
        return getBookInfo(src);
    })
    return Promise.all(books);
}

getFetchBooksInfo().then(res =>{
    Book.bulkCreate(res)
})


