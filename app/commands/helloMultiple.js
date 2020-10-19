module.exports = {
    command: "hmultiple",
    minArgs: 1,
    syntax: `<nome1> <nome2> ...`,
    callback: (message, name) => {
        message.channel.send(`Olá, ${name}! Boa noite a todos!`)
    }
}