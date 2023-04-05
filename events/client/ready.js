const chalk = require("chalk");
var os = require('os-utils');
const mongoose = require("mongoose");
const { mongoPass } = require("../../config.json"); 
const moment = require("moment");
moment.locale('ko');  
require("moment-duration-format");

module.exports = (client) => {

  const guildin = client.guilds.cache.size;
  const guildmember = client.users.cache.size;
  
 client.user.setPresence({ status: "online" });
 //-----------------봇 상태 메세지-------------------------------
setInterval(() => {
  const date = moment().add(9, 'hours').format('HH-mm');
  if(date === "04-00") process.exit()
}, 2000);
//-----------------------------------------------------------------

  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let allChannels = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      allChannels.add(channel.id);
    });
  });

  console.log(
    chalk.bgMagentaBright.black(` 총 ${client.guilds.cache.size}서버`),
    chalk.bgMagentaBright.black(` 총 ${client.channels.cache.size}채널`),
    chalk.bgMagentaBright.black(` 총 ${allMembers.size} 명`)
  );
  // mongoose.set("strictQuery", false);
  mongoose.connect(mongoPass, {})
  .then(
    console.log(
      chalk.bgGreenBright.black(
        ` ${client.user.username} 성공적으로 몽고DB를 연결했습니다. `
      )
    )
  )
  .catch((err) =>
    console.log(
      chalk.bgRedBright.black(
        ` ${client.user.username} 몽고DB 연결을 실패했습니다. `+err
      )
    )
  );
};
