module.exports = {
    name: 'help',
    description: 'Comando de ayuda para mostrar los comandos disponibles y su uso.',
    execute(message, client, PREFIX) {
        var messageStr = "estos son los comandos que hay disponibles: ";
        client.commands.forEach(command => {
            var newMessage = `\`\`\`[${PREFIX}${command.name}]: ${command.description}\`\`\``;
            messageStr = messageStr + newMessage;
        })
        return message.reply(messageStr);

    }
}