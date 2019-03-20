/*
根据用户发送的消息定义响应数据
*/
module.exports = (userData) => {

    const option = {
        type: 'text',
        fromUserName: userData.FromUserName,
        toUserName: userData.ToUserName,
        content: '你好！请输入关键词'
    };
    if (userData.MsgType === 'text') {
        if (userData.Content === '1') {
            option.content = '你若安好，便是晴天。'
        }
        else if (userData.Content === '2') {

            option.content = '校长说:\n' +
                '奋斗真的只是因为\n ' +
                '好吃的很贵\n ' +
                '远方很远 \n' +
                '喜欢的人很优秀'
        }
        else if (userData.Content && userData.Content.indexOf('诗') !== -1) {
            option.content = '  《你还在我身旁》 \n' +
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
    }
    else if (userData.MsgType === 'image') {
        option.mediaId = userData.MediaId;
        option.type = 'image';
    }
    else if(userData.MsgType === 'voice'){
        console.log(123);
        option.content=userData.Recognition;
        console.log(userData);
        console.log(userData.Recognition+'122')
    }
    else if(userData.MsgType === 'location'){
        option.content=`地理纬度：${userData.Location_X}\n`+
                       `地理经度：${userData.Location_Y}\n`+
                       `地图缩放大小：${userData.Scale}\n`+
                       `位置信息：${userData.Label}`;

    }
    else if(userData.Event==='subscribe'){
        option.content='欢迎小主人的关注，这里是Yuri的小书屋 QAQ~~';
        if (userData.EventKey){
            option.content='感谢你通过xxx推荐关注Yuri的公众号~~';
        }
    }
    else if(userData.Event==='unsubscribe'){
        console.log('小主人，表要走呐~~ 嘤嘤嘤···');
    }
    else if(userData.Event==='CLICK'){
        option.content='小主人你点击了菜单~~'
    }
    return option;
};

