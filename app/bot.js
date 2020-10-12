const Discord = require('discord.js')
const { prefix } = require('./config.json')
const attachment = new Discord.MessageAttachment('public/logo.png', 'logo.png')
const commands = require('./commands')

module.exports = {
    guilds: [],
    embed: new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setAuthor("Informer")
        .setDescription("Acesse a documentação para consultar todas as funções disponíveis aqui.")
        .attachFiles(attachment)
        .setThumbnail("attachment://logo.png")
        .addField("Grupos de Canais","Lista de grupos criados:"),

    async init(guild) {
        const channel = await guild.channels.create("informer-commands", { position: 1 })

        this.guilds.push({
            name: guild.name,
            id: guild.id,
            cmdChannel: channel.id
        })

        channel.send(this.embed)
    },

    command(message) {
        if (message.author.bot) return

        const commandName = message.content.slice(1)

        const command = commands.find(command => {
            return command.name == commandName
        })

        if (!command) return message.reply("me desculpe, mas este comando não existe 😢")
        
        message.react('👍')
        command.exec(message)
    },

    verifyCmd(message) {
        return message.content.startsWith(`${prefix}`)
    },

    verifyCmdChannel(message) {
        const guild = this.guilds.find(guild => {
            return guild.cmdChannel == message.channel.id
        })
        
        if (guild) return true

        return false
    }

}