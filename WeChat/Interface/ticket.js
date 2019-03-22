/*
接口封装  请求access_token
*/
//发送请求的包
const rp = require('request-promise-native');
const fetchAccessToken = require('./accessToken');
const {writeFileData, readFileData} = require('../utils/tools');

//async函数的返回值为一个Promise对象
async function getTicket() {

    const {access_token} = await fetchAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;

    const result = await rp({method: 'GET', url, json: true});
    console.log(result);
    //提前5分钟请求
    result.expires_in = Date.now() + 7200000 - 300000;
    const ticket = {
        ticket: result.ticket,
        expires_in: result.expires_in
    };
    //保存下来
    writeFileData('./ticket.txt', ticket);

    return ticket;
}

//得到有效的access_token值
function getFetchTicket() {

    //读取文件中的值
    return readFileData('./ticket.txt')
        .then(result => {
            //判断是否过期
            if (result.expires_in < Date.now()) {//过期
                return getTicket();
            } else {//没过期
                return result
            }
        })
        .catch(err => {
            return getTicket();
        })
}

module.exports = getFetchTicket;
