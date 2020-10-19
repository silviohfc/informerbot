module.exports = {
    command: "hello",
    description: "Responde a mensagem com um olá para alguém",
    minArgs: 1,
    maxArgs: 1,
    syntax: `<nome>`,
    callback: (message, name) => {
        message.channel.send(`Olá, ${name}!`)
    }
}