const Discord = require("discord.js");
const moment = require("moment");
moment.locale('ko');  
require("moment-duration-format");
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')
const sleep = require('util').promisify(setTimeout)
const farmSchema = require('../../database/guildData/farm');
const { count } = require("console");


module.exports = async(client, message) => {
  setInterval(async() => {
    client.user.setActivity('농지은행 조회중...', { type: "WATCHING"});
    await axios.get(`https://www.fbo.or.kr/fsle/trde/TrdeList.do?menuId=020020&schOk=true&schBizTp=&reqFlndid=&currentPageNo=1&recordCountPerPage=100&getAddrYn=Y&schLegalId=&schAddress=&schSidoCd=45&schSigunCd=45130&schAmtMin=&schAmtMax=&schAreaMin=&schAreaMax=&schLndcgrC=&schBizclType=&schStat=Y`)
    .then( async (i) => {
    const $ = cheerio.load(i.data);
    const $infos = $(".ddfs_info");
    const datt = await farmSchema.find()
    let farmdata = [];
    let farmdata1 = [];

    for(const e of datt){
      farmdata.push( e.title )
    }
    await sleep(3000);
    $infos.each( async(idx,node) => {
      const farmData = await farmSchema.find({ title: $(node).find(".ddfs_view_detail").text(), })

      farmdata1.push( $(node).find(".ddfs_view_detail").text() )

      if(farmData.length < 1){///////////////////////////

        let a

        if(!farmdata.includes($(node).find(".ddfs_view_detail").text())){

         a = await client.channels.cache.get('1086186082418303076').send({embeds: [
          new MessageEmbed()
          .setColor("#FFFFFF")
          .setAuthor({ name: `구분: ${idx} \ ${$(node).find(".btn_bizclid_info").text()}`})
          .setDescription(`📃 위치: [${$(node).find(".ddfs_view_detail").text()}](https://www.fbo.or.kr/fsle/trde/${$(node).find(".ddfs_view_detail").attr("href")})(${$(node).find("td:nth-child(6)").text()}원)`)
        ]})

        let newData = new farmSchema({
          rental: $(node).find(".btn_bizclid_info").text(),//임대인지 매도인지
          number: $(node).find("td:nth-child(4)").text(),//등록된 땅이 1개인지 2개 이상인지
          title: $(node).find(".ddfs_view_detail").text(),//주소
          price: $(node).find("td:nth-child(6)").text(),//가격
          area: $(node).find("td:nth-child(5)").text(),//면적
          data: $(node).find("td:nth-child(7)").text().replace(/[\n\t]/g, ''),//신청 마감 기간
          msg: a.id,
          channel: a.channelId
        })
        await newData.save();
      }
      }///////////////////////////
    })
    await sleep(6000);
    var acou = false
    if(farmdata.length > 0 && farmdata1.length < 1){
      await axios.get(`https://www.fbo.or.kr/fsle/trde/TrdeList.do?menuId=020020&schOk=true&schBizTp=&reqFlndid=&currentPageNo=1&recordCountPerPage=100&getAddrYn=Y&schLegalId=&schAddress=&schSidoCd=45&schSigunCd=45130&schAmtMin=&schAmtMax=&schAreaMin=&schAreaMax=&schLndcgrC=&schBizclType=&schStat=Y`)
      .then( async (i) => { 
        console.log(farmdata1)
        const $$ = cheerio.load(i.data);
        const $$infos = $$(".ddfs_info");  
        if($$infos.length > 0) {
          acou = true
          console.log(`조회 ${$$infos.length}개 결과 실패`)
        }
      })
    }
    if(acou === true) return client.user.setActivity('농지은행 조회실패!', { type: "WATCHING"});
    const farD = farmdata.filter((e) => !farmdata1.includes(e))
    for(let i=0; i < Number(farD.length); i++){
      const farmData = await farmSchema.find({ title: farD[i], })
      if(farmData){
        await client.channels.cache.get(farmData[0].channel).messages.fetch(farmData[0].msg)
        .then(async (msg) => {
          console.log(farmData[0].title)
          await farmData[0].delete()
          await msg.delete();
      });
      }
    }
  })
   client.user.setActivity('농지은행 조회완료!', { type: "WATCHING"});
}, 600000);
};
