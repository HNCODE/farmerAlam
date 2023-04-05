module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  // mentioned bot
  if (message.content ===`<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
    return message.channel.send(
      `${client.user.username}봇은 슬래시커맨드(빌더) 기반으로 제작 되었습니다. \n\n명령 목록을 가져오려면 \`/help\`를 입력하십시오.`
    );
  }
};
