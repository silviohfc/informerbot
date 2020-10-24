const fs = require("fs")
const data = require("../data.json")

module.exports = {
    command: "gdelete",
    minArgs: 1,
    syntax: "<nome do grupo>",
    callback: (message, groupName) => {
        const { channels } = message.guild
        groupName = groupName.toString()
        let guildIndex,
            groupIndex

        const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
            if (dataGuild.guildID == message.guild.id) {
                guildIndex = foundIndex
                return true
            }
        })

        const group = foundGuild.channelGroups.find((group, foundIndex) => {
            groupIndex = foundIndex
            return group.name === groupName
        })

        console.log(groupName)

        if (!group) return message.channel.send("Desculpe, mas esse grupo não existe!")
        
        const filteredGroups = data.guilds[guildIndex].channelGroups.filter(group => {
            return group.name !== groupName
        })

        data.guilds[guildIndex].channelGroups = filteredGroups
       
        fs.writeFile("app/data.json", JSON.stringify(data, null, 2), err => {
            if (err) return console.log("Erro ao escrever o arquivo!")
            return message.channel.send(`O grupo "${groupName}" foi excluído com sucesso!`)
        })

    }
}