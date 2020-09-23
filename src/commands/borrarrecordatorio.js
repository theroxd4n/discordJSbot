var Reminder = require('../models/reminder');
var User = require('../models/user');
const mongoose = require("mongoose");
const { PREFIX } = require('../config.json');
module.exports = {
    name: 'borrarrecordatorio',
    description: 'Comando para borrar recordatorios.',
    usage: `${PREFIX}borrarrecordatorio ID`,
    execute(message, args) {
        if (args.length != 1 ) return message.reply(`Uso: \`\`\`${this.usage}\`\`\``);
        if(!mongoose.Types.ObjectId.isValid(args[0])) return message.reply("no has introducido un ID válido.");
        var author = message.author;
        User.findOne({ dsId: author.id }, (err, issetUser) => {
            if (err) {
                return message.reply("se ha producido un error.")
            }
            if (!issetUser) {
                return message.reply("no estas registrado en la base de datos. Para hacerlo, crea un recordatorio.")
            }

            Reminder.findOneAndDelete({ _id: args[0], user: issetUser._id }, (err, reminder) => {
                if (err) {
                    return message.reply("se ha producido un error.")
                }
                if (!reminder) {
                    return message.reply("no se ha encontrado ningún recordatorio con ese ID.")
                }
    
                // DEVOLVER RESPUESTA
                return message.reply("el recordatorio se ha eliminado correctamente.")
            });

        });
        
    }
    
}
