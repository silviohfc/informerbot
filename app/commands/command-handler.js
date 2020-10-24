const { prefix } = require("../config.json")
const data = require("../data.json")

module.exports = (client, commandOptions) => {

    // Destructuring command options, keeping the existing content and setting default value if not
    let {
        command,
        minArgs = 0,
        maxArgs = null,
        syntax,
        callback
    } = commandOptions

    // Message event listener
    client.on("message", message => {
        const { author, channel, content, guild } = message

        const foundGuild = data.guilds.find((dataGuild) => {
            return dataGuild.guildID == guild.id
        })

        // Check if message author is a bot
        if (author.bot) return
        // Check if the message was sent in DM
        if (channel.type === "dm") return 
        // Check if the message was sent in right channel
        if (channel.id != foundGuild.channelID) return 


        // Check if the message starts with the prefix
        if (content.toLowerCase().startsWith(`${prefix}${command.toLowerCase()}`)) {
            
            // Split content with any numeber of blank spaces
            const arguments = content.split(/[ ]+/)

            // Remove the command
            arguments.shift()

            if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                message.reply(`A sintaxe do comando está incorreta! Utilize ${prefix}${command} ${syntax}`)
                return
            }

            callback(message, arguments)
            return
            
        }

    })
}