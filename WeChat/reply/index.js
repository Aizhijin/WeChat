/*
中间件模块
*/
const sha1 = require('sha1');

const {getUserDataAsync,parseXMLData,formatJsData}=require('../utils/tools');

const mould=require('./mould');

module.exports=()=>{
    return async (req, res) => {

        const {timestamp, nonce, signature, echostr} = req.query;
        const token = '43326hezhijin';
        const sha1Arr = sha1([timestamp, nonce, token].sort().join(''));

        if (req.method==="GET"){
            if (sha1Arr === signature) {
                res.end(echostr);
            } else {
                res.end('error');
            }
        } else if(req.method==="POST"){
            if (sha1Arr !== signature) {
                res.end('error');
                return
            }

            const xmlData=await getUserDataAsync(req);
            const jsData=parseXMLData(xmlData);
            const userData=formatJsData(jsData);

            console.log(userData);

            const option={
                type:'text',
                fromUserName:userData.FromUserName,
                toUserName:userData.ToUserName,
                content: '你好！请输入关键词'
            };

            //实现回复
            if (userData.Content==='1'){
                option.content='你若安好，便是晴天。'
            }
            else if(userData.Content==='2'){

                option.content='校长说:\n' +
                    '奋斗真的只是因为\n ' +
                    '好吃的很贵\n ' +
                    '远方很远 \n' +
                    '喜欢的人很优秀'
            }
            else if(userData.Content&&userData.Content.indexOf('3')!==-1){
                option.content='  《你还在我身旁》 \n' +
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
            else if(userData.MsgType==='image') {
                option.mediaId=userData.MediaId;
                option.type='image';
            }
            
            const replyMessage=mould(option);
                
            res.send(replyMessage);

        }else {
            res.end('error')
        }

    }
};