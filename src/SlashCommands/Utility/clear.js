const {OWNER_ID} = require("../../../config.json")
module.exports = {
    name: "청소",
    category: "Utility",
    description: "채팅 청소",
     botPerms: ["MANAGE_MESSAGES"],
    userPerms: [""],
   options: [
                {
                    name: '숫자',
                    description: '1~100사이로 적어주세요',
                    type: "INTEGER"
                }
            ],
             run: async(client, interaction, args) => {
                if(!OWNER_ID.includes(interaction.member.id))return interaction.reply({content: "이 명령어를 사용하려면 **Bot Owner**권한이 필요합니다."})
                 const msgnum = interaction.options.getInteger('숫자')
                 interaction.channel.bulkDelete(msgnum, true);
                 await interaction.reply('🗑 청소 완료!').then( setTimeout(function(){interaction.deleteReply()}, 4000))
  }
}
