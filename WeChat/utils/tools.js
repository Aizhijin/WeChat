const {parseString}= require('xml2js');
module.exports={

    /* */
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