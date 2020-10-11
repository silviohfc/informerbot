const Discord = require('discord.js')
const { prefix } = require('./config.json')
const attachment = new Discord.MessageAttachment('public/logo.png', 'logo.png')

module.exports = {
    cmdChannelId: 0,
    embed: new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setAuthor("Informer")
        .setDescription("Acesse a documentação para consultar todas as funções disponíveis aqui.")
        .attachFiles(attachment)
        .setThumbnail("attachment://logo.png")
        .addField("Grupos de Canais","Lista de grupos criados:"),

    async init(guild) {
        const channel = await guild.channels.create("informer-commands", { position: 1 })

        this.cmdChannelId = channel.id

        channel.send(this.embed)
    },

    command(cmd, message) {
        return message.content.startsWith(`${prefix}${cmd}`)
    },

    getChannelId() {
        return this.cmdChannelId
    }

}