/*
接口封装  请求access_token
*/
const {appId,appsecret}=require('../config/config')
//发送请求的包
const rp = require('request-promise-native');

const {writeFileData,readFileData}=require('../utils/tools');
//async函数的返回值为一个Promise对象
async function getAccessToken() {

    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`;

    const result = await rp({method: 'GET', url, json: true});
    console.log(result);

    //提前5分钟请求
    result.expires_in = Date.now() + 7200000 - 300000;
    //保存下来
    writeFileData('./acess_Token.txt',result);
    return result;
}

//得到有效的access_token值
module.exports=function getFetchAccessToken() {

        /* 内部箭头函数的返回值 就是 then / catch函数的返回值
         返回值如果是promise， 就不处理， 如果不是， 就会包一层promise返回*/

      //读取文件中的值
    return readFileData('./acess_Token.txt')

   .then(result=>{
       //判断是否过期
       if (result.expires_in<Date.now()){//过期
         return  getAccessToken();
       } else {//没过期
           return result
       }
   })
       .catch(err=>{
           return getAccessToken();
       })


};
