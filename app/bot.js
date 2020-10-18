const Discord = require('discord.js')
const attachment = new Discord.MessageAttachment('public/logo.png', 'logo.png')
const fs = require("fs")

const data = require("./data.json")
const command = require('./message-handler')

const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setAuthor("Informer")
    .setDescription("Digite !help para verificar os comandos disponíveis.")
    .attachFiles(attachment)
    .setThumbnail("attachment://logo.png")
    .addField("Grupos de Canais","Lista de grupos criados:")


function init(guild) {
    if (!guild.me.hasPermission('ADMINISTRATOR')) return

    let index = 0

    const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
        if (dataGuild.guildID == guild.id) {
            index = foundIndex
            return true
        }
    })
    const foundChannel = guild.channels.cache.find(channel => {
        return channel.name === "informer-commands"
    })

    if (!foundGuild && !foundChannel) {
        guild.channels.create("informer-commands").then(channel => {
            
            const newGuild = {
                name: guild.name,
                guildID: guild.id,
                channelID: channel.id,
                channelGroups: []
            }

            data.guilds.push(newGuild)

            fs.writeFile("app/data.json", JSON.stringify(data, null, 2), err => {
                if (err) return console.log("Write file error!")

                return
            })

            channel.send(embed)

        })

    } 
    else if (!foundChannel) {

        guild.channels.create("informer-commands").then(channel => {
            const newGuild = {
                ...foundGuild,
                channelID: channel.id
            }

            data.guilds[index] = newGuild

            fs.writeFile("app/data.json", JSON.stringify(data, null, 2), err => {
                if (err) return console.log("Write file error!")

                return
            })

            channel.send(embed)
        })
   
    }

}



module.exports = { init, command }