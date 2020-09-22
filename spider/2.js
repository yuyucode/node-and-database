const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path')
let number = 0;

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


async function getBookUrlToInfo(url) {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const name = $("#info h1").text();
    const imgUrl = $("#fmimg img").attr("src");
    const author = $("#info").find("p").eq(0).text().replace(/\s*/g, "").match(/(?<=[：]).+/g)[0];

    return {
        name,
        imgUrl,
        author,
        url
    }
}

async function fetchAll() {
    const links = await getAllBookLink();
    const newLinks = links.slice(number, number + 1);
    console.log(newLinks)
    const data = newLinks.map(item => {
        return getBookUrlToInfo(item);
    })
    return Promise.all(data);
}


// setInterval(() => {
//     fetchAll().then(res => {
//         console.log(res);
//         number++;
//     })
// }, 5000)

const filename = path.resolve(__dirname, './bquge.txt')

async function test() {
    const dateArray = await fetchAll();
    await fs.promises.writeFile(filename, JSON.stringify(dateArray).replace(/([\[]])/g,""), {
        flag: "a"
    })
}

test();


// setInterval(() => {
//     number++;
//     test();
// }, 20000)