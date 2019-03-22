/*
中间件模块
*/
const sha1 = require('sha1');

const {getUserDataAsync, parseXMLData, formatJsData} = require('../utils/tools');

const mould = require('./mould');

const response = require('./response');

module.exports = () => {
    return async (req, res) => {

        //结构赋值，得到请求数据
        const {timestamp, nonce, signature, echostr} = req.query;
        const token = '43326hezhijin';
        //拼串并用sha1加密
        const sha1Arr = sha1([timestamp, nonce, token].sort().join(''));
        //判断请求方式（是否来自微信服务器）
        if (req.method === "GET") {
            if (sha1Arr === signature) {
                res.end(echostr);
            } else {
                res.end('error');
            }
        } else if (req.method === "POST") {
            if (sha1Arr !== signature) {
                res.end('error');
                return
            }
            //得到用户数据
            const xmlData = await getUserDataAsync(req);
            //转化为js类型数据
            const jsData = parseXMLData(xmlData);
            //转化为良好s类型数据
            const userData = formatJsData(jsData);
            //实现回复
            const option = response(userData);
            //调用模板函数返回相应类型消息
            const replyMessage = mould(option);
            //返回响应
            res.send(replyMessage);

        } else {
            res.end('error')
        }

    }
};