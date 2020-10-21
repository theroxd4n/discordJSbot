const { PREFIX } = require('../config.json');
module.exports = {
    name: 'juego',
    description: 'Comando para jugar',
    usage: `${PREFIX}juego [a,s,d,f]`,
    execute(message, args, io) {
        if (args.length == 0) return message.reply(`debes usar el comando de la siguiente manera: \`\`\`${this.usage}\`\`\``);
            io.emit("keydown", args[0])
            setTimeout(function(){ io.emit("keyup", args[0]) }, 100);
        }

}
