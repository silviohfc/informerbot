const { Channel } = require("discord.js")

module.exports = {
    command: "clear",
    callback: async message => {
        
        let fetched

        do {
            fetched = await message.channel.messages.fetch({limit: 100})
            message.channel.bulkDelete(fetched)
        }
        while(fetched.size > 0)
        
    }
}