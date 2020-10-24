const fs = require("fs")
const data = require("../data.json")

module.exports = {
    command: "gcreate",
    minArgs: 2,
    syntax: "<nome do grupo> <canal1> <...>",
    callback: (message, channelGroup) => {
        const { channels } = message.guild
        let index

        const groupName = channelGroup.shift()

        const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
            if (dataGuild.guildID == message.guild.id) {
                index = foundIndex
                return true
            }
        })

        const hasAllChannels = channelGroup.every(item => {
            const channel = channels.cache.find(channel => channel.name === item)
            
            if (!channel) return false

            return channel.name === item && channel.type === "text"
        })

        const hasSameName = foundGuild.channelGroups.find(group => {
            return group.name === groupName
        })

        if (hasSameName) {
            return message.channel.send("Desculpe, mas já existe um grupo com esse nome!")
        }
        
        if (!hasAllChannels) {
            return message.channel.send("Desculpe, mas um dos canais digitados não existe!")
        }
        
        data.guilds[index].channelGroups.push({
            name: groupName,
            channels: channelGroup
        })
       
        fs.writeFile("app/data.json", JSON.stringify(data, null, 2), err => {
            if (err) return console.log("Erro ao escrever o arquivo!")
            return message.channel.send(`Criado novo grupo de canais chamado "${groupName}"!`)
        })

    }
}