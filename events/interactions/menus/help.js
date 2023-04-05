const Discord = require('discord.js')

module.exports = async (interaction, client) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "help_menu") {

    let msg = await interaction.channel.messages.fetch(interaction.message.id)

    
    if (interaction.values[0] === "home") {
      await interaction.deferUpdate()
      const settingsEmbed = new Discord.MessageEmbed()
      .setTitle("🏠 메인페이지")
      .setDescription('아래 메뉴에서 옵션을 선택하십시오!')
      .setColor("GREEN")
    
        await msg.edit({ embeds: [settingsEmbed] });
  
      } else if (interaction.values[0] === "info") {

      await interaction.deferUpdate()
      const categoryToCommand = client.slash.filter(el => el.category === "info").map(el => `${el.name}`)
      const categoryToCommands = categoryToCommand.length === 0 ? '`명령어가 존재하지 않아요!`' : `\`${categoryToCommand.join('`, `')}\``

      const infoEmbed = new Discord.MessageEmbed()
        .setTitle("📋 정보")
        .setDescription(categoryToCommands)
        .setColor("RANDOM");

      await msg.edit({ embeds: [infoEmbed] })

    } else if (interaction.values[0] === "Mod") {
      await interaction.deferUpdate()
      const categoryToCommand = client.slash.filter(el => el.category === "Mod").map(el => `${el.name}`)
      const categoryToCommands = categoryToCommand.length === 0 ? '`명령어가 존재하지 않아요!`' : `\`${categoryToCommand.join('`, `')}\``

      const modEmbed = new Discord.MessageEmbed()
        .setTitle("🔧 관리자")
        .setDescription(categoryToCommands)
        .setColor("RANDOM");

      await msg.edit({ embeds: [modEmbed] })

    } else if (interaction.values[0] === "Owner") {
      await interaction.deferUpdate()
      const categoryToCommand = client.slash.filter(el => el.category === "Owner").map(el => `${el.name}`)
      const categoryToCommands = categoryToCommand.length === 0 ? '`명령어가 존재하지 않아요!`' : `\`${categoryToCommand.join('`, `')}\``

      const modEmbed = new Discord.MessageEmbed()
        .setTitle("🔒 봇 오너")
        .setDescription(categoryToCommands)
        .setColor("RANDOM");

      await msg.edit({ embeds: [modEmbed] })

    } else if (interaction.values[0] === "Gameble") {
      await interaction.deferUpdate()
      const categoryToCommand = client.slash.filter(el => el.category === "Gameble").map(el => `${el.name}`)
      const categoryToCommands = categoryToCommand.length === 0 ? '`명령어가 존재하지 않아요!`' : `\`${categoryToCommand.join('`, `')}\``

      const modEmbed = new Discord.MessageEmbed()
        .setTitle("💰 도박")
        .setDescription(categoryToCommands)
        .setColor("RANDOM");

      await msg.edit({ embeds: [modEmbed] })

    } else if (interaction.values[0] === "Utility") {
      await interaction.deferUpdate()
      const categoryToCommand = client.slash.filter(el => el.category === "Utility").map(el => `${el.name}`)
      const categoryToCommands = categoryToCommand.length === 0 ? '`명령어가 존재하지 않아요!`' : `\`${categoryToCommand.join('`, `')}\``

      const utilityEmbed = new Discord.MessageEmbed()
        .setTitle("📐 유틸리티")
        .setDescription(categoryToCommands)
        .setColor("RANDOM");

      await msg.edit({ embeds: [utilityEmbed] })

    }
  }
}
