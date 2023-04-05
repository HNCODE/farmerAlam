
module.exports = async(interaction, client) => {
    const { OwnerID } = require('../../config.json')

    if (!interaction.isCommand()) return;

        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Erorr' });

        if (command.ownerOnly) {
            if (!interaction.member.user.id == OwnerID) {
                return interaction.reply('개발 중인 명령!')
            }
        }

        if (command.userPerms) {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has(command.userPerms || [])) {
                if (command.noUserPermsMessage) {
                    return interaction.reply(command.noUserPermsMessage)
                } else if (!command.noUserPermsMessage) {
                    return interaction.reply(`이 명령어를 사용하려면 \`${command.userPerms}\`권한이 필요합니다.`)
                }
            }
        }

        if (command.botPerms) {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(client.user.id).permissions.has(command.botPerms || [])) {
                if (command.noBotPermsMessage) {
                    return interaction.reply(command.noBotPermsMessage)
                } else if (!command.noBotPermsMessage) {
                    return interaction.reply(`이 명령을 실행하려면 \`${command.userPerms}\`권한이 필요합니다!`)
                }
            }
        } 

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x =>  {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        try {

            command.run(client, interaction, args)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }