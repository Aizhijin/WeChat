/*
主模块（启动项）
*/
const express = require('express');
const reply=require('./reply/index');
const app = express();

//中间件处理函数
app.use(reply());

app.listen(5400, err => {
    if (!err) {
        console.log('服务器启动成功')
    } else {
        console.log(err);
    }
});

