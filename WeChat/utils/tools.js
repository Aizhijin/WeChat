const {parseString}= require('xml2js');
module.exports={

    //得到用户信息
    getUserDataAsync (req){
        return new Promise((resolve, reject)=>{
            let xmldata='';
            req.on('data',data=>{
                xmldata+=data.toString();
            }).on('end',()=>{
                resolve(xmldata);
            });
    })

},
    //将XML转化为js对象
    parseXMLData (xmlData){
        let jsData=null;
        parseString(xmlData,{trim:true},(err,result)=>{
            if (!err){
                jsData=result;
            } else {
                jsData={};
            }
        });

        return jsData;
    },
    //格式化js对象数据的值
    formatJsData(jsData){
        const {xml}=jsData;
        const userData={};

        //提取属性值的数组中值
        for(let key in xml){
            userData[key]=xml[key][0];
        }
        return userData
    }
};