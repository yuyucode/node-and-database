const axios = require('axios');
const cheerio = require('cheerio');

const Book = require('../bqugeModels/Book')
let linkss ;
const links = getAllBookLink().then(res => {
   linkss = res;
});


/**
 * 获取笔趣阁目录的html
 * @return {Promise<any>}
 */
async function getBqugeHtml() {
    const res = await axios.get('http://www.xbiquge.la/xiaoshuodaquan/');
    return res.data
}

/**
 * 返回所有书籍地址
 * @return {Promise<[]>}
 */
async function getAllBookLink() {
    const html = await getBqugeHtml();
    const $ = cheerio.load(html);
    const aLink = $("#main .novellist > ul > li > a");
    const links = aLink.map((i, ele) => {
        return ele.attribs['href'];
    });

    return Array.from(links)
}

/**
 * 根据地址 获取 详情页信息
 * @param url
 * @return {Promise<{imgUrl: jQuery, author: *, name: jQuery, url: *}>}
 */
async function getBookUrlToInfo(url) {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const name = $("#info h1").text();
    const imgUrl = $("#fmimg img").attr("src");
    const author = $("#info").find("p").eq(0).text().replace(/\s*/g, "").match(/(?<=[：]).+/g)[0];

    const obj = {
        name,
        imgUrl,
        author,
        url
    }
    console.log(obj)
    return obj
}

/**
 * 获取所有书籍
 * @return {Promise<{imgUrl: jQuery, author: *, name: jQuery, url: *}[]>}
 */
async function fetchAll(num) {
    const newLink = linkss.slice(num, num + 1)
    const data = newLink.map(item => {
        return getBookUrlToInfo(item);
    })
    return Promise.all(data);
}

let timer = setInterval(()=>{
    test();
},10000)


let i = 1400;
async function test() {
    const res = await fetchAll(i++);
    await Book.bulkCreate(res);
    if(i>=3000){
        window.clearInterval(timer);
    }
    return null;
}




