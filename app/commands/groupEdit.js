const fs = require("fs")
const data = require("../data.json")

module.exports = {
    command: "gedit",
    minArgs: 2,
    syntax: "<nome do grupo> <canal1> <...>",
    callback: (message, channelGroup) => {
        const { channels } = message.guild
        let guildIndex,
            groupIndex

        const groupName = channelGroup.shift()

        const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
            if (dataGuild.guildID == message.guild.id) {
                guildIndex = foundIndex
                return true
            }
        })

        const hasAllChannels = channelGroup.every(item => {
            const channel = channels.cache.find(channel => channel.name === item)
            
            if (!channel) return false

            return channel.name === item && channel.type === "text"
        })

        const group = foundGuild.channelGroups.find((group, foundIndex) => {
            groupIndex = foundIndex
            return group.name === groupName
        })

        if (!group) return message.channel.send("Desculpe, mas esse grupo não existe!")

        if (channelGroup[0] === "-n") {
            const newGroupName = channelGroup[1]
                        
            data.guilds[guildIndex].channelGroups[groupIndex] = {
                ...data.guilds[guildIndex].channelGroups[groupIndex],
                name: newGroupName
            }

            fs.writeFile("app/data.json", JSON.stringify(data, null, 2), err => {
                if (err) return console.log("Erro ao escrever o arquivo!")
                message.channel.send(`O grupo "${groupName}" foi editado com sucesso!`)
            })

            return
        }
        
        if (!hasAllChannels) return message.channel.send("Desculpe, mas um dos canais digitados não existe!")

        
        data.guilds[guildIndex].channelGroups[groupIndex] = {
            name: groupName,
            channels: channelGroup
        }
       
        fs.writeFile("app/data.json", JSON.stringify(data, null, 2), err => {
            if (err) return console.log("Erro ao escrever o arquivo!")
            return message.channel.send(`O grupo "${groupName}" foi editado com sucesso!`)
        })

    }
}