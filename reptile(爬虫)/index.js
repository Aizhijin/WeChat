const puppeteer = require('puppeteer');

(async () => {
    //打开浏览器
    const browser = await puppeteer.launch({
        headless:false//开启浏览器显示模式
        });
    //新建标签页
    const page = await browser.newPage();
    //跳转网页
    await page.goto('http://www.bilibili.com/');
    const arr= await page.evaluate(()=>{
        //抓取网页内容
        const drr=[];
        $('#app .bili-wrapper #bili_live .live-module .l-con .storey-box .card-live-module .t ').each(function () {
            drr.push(this.innerHTML)
        });
    return drr;
    });

   console.log(arr);
    await browser.close();
})();