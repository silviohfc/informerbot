const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config.json')
const bot = require('./bot')

client.on("guildCreate", guild => {
    bot.init(guild)
})

client.on('message', async message => {
	if(bot.command("info", message)) {
        message.reply(bot.getChannelId())
    }
});

client.login(token);