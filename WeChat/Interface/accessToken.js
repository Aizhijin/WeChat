/*
接口封装  请求access_token
*/
//发送请求的包
const rp = require('request-promise-native');

const {writeFile,readFile}=require('fs');
//async函数的返回值为一个Promise对象
async function getAccessToken() {
    const appId = 'wxb498a65a05066a32';
    const appSecret = 'b43487932948a2dc7c94546e507e0f9b';

    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

    const result = await rp({method: 'GET', url, json: true});

    //提前5分钟请求
    result.expires_in = Date.now() + 7200000 - 300000;
    //保存下来
    writeFile('./acess_Token.txt',JSON.stringify(result),(err)=>{
        if (!err){
            console.log('文件保存成功!');
        } else {
            console.log(err)
        }
    });
    return result;
}

//得到有效的access_token值
module.exports=function getFetchAccessToken() {

  return new Promise(((resolve, reject) => {
        /* 内部箭头函数的返回值 就是 then / catch函数的返回值
         返回值如果是promise， 就不处理， 如果不是， 就会包一层promise返回*/

      //读取文件中的值
       readFile('./accessToken',(err,data)=>{
           if(!err){
               //将数据转换成js对象
              resolve(JSON.parse(data.toString()));
           }else {
               console.log(err)
           }
       })
   })).then(result=>{
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
