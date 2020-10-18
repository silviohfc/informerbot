const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config.json')
const bot = require('./bot')

client.on("guildCreate", guild => {
    bot.init(guild)
})

client.on('message', async message => {
	bot.command(message.client, message)
})

client.login(token);