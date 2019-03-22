const {parseString} = require('xml2js');
const {writeFile, readFile} = require('fs');
const {resolve} = require('path');
module.exports = {

    //得到用户信息
    getUserDataAsync(req) {
        return new Promise((resolve, reject) => {
            let xmldata = '';
            req.on('data', data => {
                xmldata += data.toString();
            }).on('end', () => {
                resolve(xmldata);
            });
        })

    },
    //将XML转化为js对象
    parseXMLData(xmlData) {
        let jsData = null;
        parseString(xmlData, {trim: true}, (err, result) => {
            if (!err) {
                jsData = result;
            } else {
                jsData = {};
            }
        });

        return jsData;
    },
    //格式化js对象数据的值
    formatJsData(jsData) {
        const {xml} = jsData;
        const userData = {};

        //提取属性值的数组中值
        for (let key in xml) {
            userData[key] = xml[key][0];
        }
        return userData
    },
    //数据写入文件
    writeFileData(filePath, data) {
        filePath = resolve(__dirname, '../interface', filePath);
        return new Promise((resolve, reject) => {

            writeFile(filePath, JSON.stringify(data), (err) => {
                if (!err) {
                    console.log('文件保存成功!');
                    resolve();
                } else {
                    reject(err);
                }
            });
        })
    },
    //读取文件中的信息
    readFileData(filePath) {

        filePath = resolve(__dirname, '../interface', filePath);
        return new Promise((resolve, reject) => {

            readFile(filePath, (err, data) => {
                if (!err) {
                    resolve(JSON.parse(data.toString()));
                } else {
                    reject(err);
                }
            });
        })
    }
};