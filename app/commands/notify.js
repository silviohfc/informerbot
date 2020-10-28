const data = require("../data.json")

module.exports = {
    command: "notify",
    minArgs: 2,
    syntax: "<nome do grupo> (<msg>)",
    callback: (message, args) => {
        const { channels } = message.guild


        const groupName = args.shift()
        let guildIndex

        const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
            if (dataGuild.guildID == message.guild.id) {
                guildIndex = foundIndex
                return true
            }
        })

        const selectedGroup = foundGuild.channelGroups.find(group => group.name === groupName)

        if (!selectedGroup) return message.reply("Esse grupo não existe!")
        if (!selectedGroup.channels) return message.reply("Não existem canais para serem notificados neste grupo!")
        
        selectedGroup.channels.forEach(channel => {
            const actualChannel = channels.cache.find(guildChannel => guildChannel.name === channel)

            actualChannel.send(args.toString())
        })

        message.channel.send("Os canais foram notificados com sucesso!")
    }
}