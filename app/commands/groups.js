const { embed, attachment } = require("../bot")
const data = require("../data.json")

module.exports = {
    command: "groups",
    callback: (message, name) => {
        const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
            if (dataGuild.guildID == message.guild.id) {
                index = foundIndex
                return true
            }
        })
        
        let newFields = [{ name: "Grupo de Canais", value: "Lista de grupos criados:" }]

        foundGuild.channelGroups.forEach(group => {
            newFields.push({
                name: group.name,
                value: group.channels,
                inline: true
            })
        })

        const newEmbed = {
            ...embed,
            fields: newFields

        }

        console.log(newEmbed)
        
        message.channel.send({ files: [attachment], embed: newEmbed })
    }
}