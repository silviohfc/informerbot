const data = require("./data.json")

module.exports = (client, message) => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return
    if (message.guild.me.hasPermission('ADMINISTRATOR')) return data
}