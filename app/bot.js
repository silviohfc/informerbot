const Discord = require('discord.js')
const attachment = new Discord.MessageAttachment('public/logo.png', 'logo.png')
const fs = require("fs")
const path = require('path')

const data = require("./data.json")

// The commands channel name
const channelName = "informer-commands" 

// The embed with de groups to send with messages
const embed = {
    color: "#FFFFFF",
    author: {
        name: "Informer"
    },
    description: "Digite !help para verificar os comandos disponíveis.",
    thumbnail: {
        url: "attachment://logo.png"
    }
}

/*const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setAuthor("Informer")
    .setDescription("Digite !help para verificar os comandos disponíveis.")
    .attachFiles(attachment)
    .setThumbnail("attachment://logo.png")
    .addField("Grupos de Canais","Lista de grupos criados:")*/

// The function that will create the commands channel and add the server to data.json
function init(guild) {
    if (!guild.me.hasPermission('ADMINISTRATOR')) return // DO NOTHING if doesnt have admin permissions

    let index = 0

    // Find server and commands channel in data if exists
    const foundGuild = data.guilds.find((dataGuild, foundIndex) => {
        if (dataGuild.guildID == guild.id) {
            index = foundIndex
            return true
        }
    })
    const foundChannel = guild.channels.cache.find(channel => {
        return channel.name === channelName
    })

    // Create commands channel and save both in data
    if (!foundGuild && !foundChannel) {
        guild.channels.create(channelName).then(channel => {
            
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

        guild.channels.create(channelName).then(channel => {
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

// Register every command file inside folder "Commands"
function registerCommands(client) {
    
    console.log('The bot is ready!')

    const baseFile = 'command-handler.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))

        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile){
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')
}



module.exports = { init, registerCommands, embed, attachment }