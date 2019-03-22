/*
主模块（启动项）
*/
const express = require('express');
const reply = require('./reply/index');
const sha1 = require('sha1');
const getFetchTicket = require('./Interface/ticket');
const {url, appId} = require('./config/config');

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');
/*
   1. 参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）。
   2. 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。
   3. 这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
 */
//中间件处理函数
app.use(express.static('img'));

app.get('/search', async (req, res) => {
    //获取ticket
    console.log(123);
    const {ticket} = await getFetchTicket();
    const noncestr = Math.random().toString().slice(2);
    const timestamp = Math.round(Date.now() / 1000);

    const arr = [
        `jsapi_ticket=${ticket}`,
        `url=${url}/search`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
    ];
    const signature = sha1(arr.sort().join('&'));
    res.render('search', {noncestr, timestamp, signature, url, appId});

});
app.use(reply());


app.listen(5400, err => {
    if (!err) {
        console.log('服务器启动成功')
    } else {
        console.log(err);
    }
});

