/*
实现公众号各种接口
*/
const rp = require('request-promise-native');
const getFetchAccessToken = require('./accessToken');
const menu = {
    "button": [
        {
            "type": "click",//单击菜单
            "name": "今日歌曲",
            "key": "daysMusic"
        },
        {
            "name": "发图",
            "sub_button": [
                {
                    "type": "pic_sysphoto",//跳转网址按钮
                    "name": "系统拍照发图",
                    "key": "rselfmenu_1_0",
                },
                {
                    "type": "pic_weixin",
                    "name": "微信相册发图",
                    "key": "pci"
                },
                {
                    "type": "pic_photo_or_album",
                    "name": "拍照或者相册发图",
                    "key": "V10GOOD"
                },
                {
                    "type": "click",
                    "name": "赞一下我们",
                    "key": "0233OD"
                },
            ]
        }, {
            "name": "消息",
            "sub_button": [
                {
                    "type": "click",//跳转网址按钮
                    "name": "今日新闻",
                    "key": "rselfmu_1_0",
                },
                {
                    "type": "click",
                    "name": "最新推送",
                    "key": "5ci"
                },
                {
                    "type": "view",
                    "name": "百度一下",
                    "url":"http://www.baidu.com/"
                }
            ]
        }
    ]

};

async function createMenu() {
    //获取accessToken
    const {access_token} = await getFetchAccessToken();

    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
    //发送请求
    return  await rp({method: 'POST', url, json: true, body: menu});



}

async function deletMenu() {
    //获取accessToken
    const {access_token} = await getFetchAccessToken();

    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;
    //发送请求

    return await rp({method: 'GET', url, json: true});



}

(async function () {
    let resualt = await deletMenu();
    console.log(resualt);
    resualt = await createMenu();
    console.log(resualt)
})();
