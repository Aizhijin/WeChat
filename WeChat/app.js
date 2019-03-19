const express = require('express');
const sha1 = require('sha1');
const {parseString}= require('xml2js');
const app = express();

app.use(async (req, res) => {

    //解析请求体数据
    const {timestamp, nonce, signature, echostr} = req.query;
    const token = '43326hezhijin';

    //1）将token、timestamp、nonce三个参数进行字典序排序
    const sortArr = [timestamp, nonce, token].sort();

    //2）将三个参数字符串拼接成一个字符串进行sha1加密
    const sha1Arr = sha1(sortArr.join(''));

    //3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信

    if (req.method==="GET"){//检测请求方式为服务器
        if (sha1Arr === signature) {
            res.end(echostr);
            //消息来自服务器
        } else {
            res.end('error');
        }
    } else if(req.method==="POST"){//检测请求方式为用户的信息

        //过滤掉不是微信服务器发送的消息
        if (sha1Arr !== signature) {
            res.end('error');
            return

        }
        //提取post中的请求数据
        const xmlData=await new Promise((resolve, reject)=>{
            let xmldata='';
            req.on('data',data=>{
                xmldata+=data.toString();
            }).on('end',()=>{
                resolve(xmldata);
            });

        });

        //转变格式为js对象
        let jsData=null;
        parseString(xmlData,{trim:true},(err,result)=>{
            if (!err){
                jsData=result;
            } else {
                jsData={};
            }
        });
        //格式化数据
        const {xml}=jsData;
        let userData={};

        //提取属性值的数组中值
        for(let key in xml){
            userData[key]=xml[key][0];
        }
        console.log(userData);

        //实现回复

        let replyContent='你好！请输入关键词';
        if (userData.Content==='1'){
            replyContent='你若安好，便是晴天。'
        } else if(userData.Content==='2'){

            replyContent='校长说:\n' +
                '奋斗真的只是因为\n ' +
                '好吃的很贵\n ' +
                '远方很远 \n' +
                '喜欢的人很优秀'
        }else if(userData.Content.indexOf('3')!==-1){
            replyContent='  《你还在我身旁》 \n' +
                '瀑布的水逆流而上，\n' +
                '蒲公英种子从远处飘回，\n' +
                '聚成伞的模样，\n' +
                '太阳从西边升起，\n' +
                '落向东方。\n' +
                '子弹退回枪膛，\n' +
                '运动员回到起跑线上，\n' +
                '我交回录取通知书，\n' +
                '忘了十年寒窗。\n' +
                '厨房里飘来饭菜的香，\n' +
                '你把我的卷子签好名字，\n' +
                '关掉电视，\n' +
                '帮我把书包背上。\n' +
                '你还在我身旁。';
        }
        const replyMessage=`<xml>
      <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${replyContent}]]></Content>
    </xml>`;
        res.send(replyMessage);




    }else {
        res.end('error')
    }

});

app.listen(5300, err => {
    if (!err) {
        console.log('服务器启动成功')
    } else {
        console.log(err);
    }
});

