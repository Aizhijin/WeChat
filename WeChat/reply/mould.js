/*
定义回复用户的6中消息模板模块
*/
module.exports=(option)=>{

    let Mssage=`<xml>
      <ToUserName><![CDATA[${option.fromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${option.toUserName}]]></FromUserName>
       <MsgType><![CDATA[${option.type}]]></MsgType>
      <CreateTime>${Date.now()}</CreateTime>`;

    if(option.type==='text'){
        Mssage+= `<MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${option.content}]]></Content>`;
    }

    else if(option.type==='image'){
        console.log(11111)
        Mssage+=`<Image>
    <MediaId><![CDATA[${option.mediaId}]]></MediaId>
  </Image>`;
    }

    else if(option.type==='voice'){
        Mssage+=`<Voice>
    <MediaId><![CDATA[${option.mediaId}]]></MediaId>
  </Voice>`;
    }

    else if(option.type==='video'){
        Mssage+=` <Video>
    <MediaId><![CDATA[${option.mediaId}]]></MediaId>
    <Title><![CDATA[${option.title}]]></Title>
    <Description><![CDATA[${option.description}]]></Description>
  </Video>`;
    }

    else if(option.type==='music'){
        Mssage+=` <Music>
    <Title><![CDATA[${option.title}]]></Title>
    <Description><![CDATA[${option.description}]]></Description>
    <MusicUrl><![CDATA[${option.musicUrl}]]></MusicUrl>
    <HQMusicUrl><![CDATA[${option.hqMusicUrl}]]></HQMusicUrl>
    <ThumbMediaId><![CDATA[${option.mediaId}]]></ThumbMediaId>
  </Music>`;
    }

    else if(option.type==='news'){
        //内容用数组装，每个内容为一个对象
        Mssage+=`<ArticleCount>${option.content.length}</ArticleCount>
                 <Articles>`;

        Mssage+=option.content.reduce((pev,currt)=>{
            return pev+  `<item>
                      <Title><![CDATA[${currt.title}]]></Title>
                      <Description><![CDATA[${currt.description}]]></Description>
                      <PicUrl><![CDATA[${currt.picurl}]]></PicUrl>
                      <Url><![CDATA[${currt.url}]]></Url>
                    </item>`
        },'');
        Mssage+=`</Articles>`;
    }

    Mssage+=`</xml>`;
return Mssage;

};