const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config.json')
const bot = require('./bot')

// Execute functions inside bot.js like middlewares
client.on("ready", async () => {
    bot.registerCommands(client)
})

client.on("guildCreate", guild => {
    bot.init(guild)
})

client.login(token);