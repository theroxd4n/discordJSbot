var Reminder = require('../models/reminder');
var User = require('../models/user');
const mongoose = require("mongoose");
const { PREFIX } = require('../config.json');
module.exports = {
    name: 'crearrecordatorio',
    description: 'Comando para añadir recordatorios.',
    usage: `${PREFIX}crearrecordatorio MENSAJE TIEMPO`,
    execute(message, args) {
        if ((args.length < 2) || (isNaN(args[args.length-1]))) return message.reply(`debes usar el comando de la siguiente manera: \`\`\`${this.usage}\`\`\``);
        var author = message.author;
        User.findOne({ dsId: author.id }, (err, issetUser) => {
            if (err) {
                console.log(err);
            }

            if (!issetUser) {
                var user = new User()
                user.username = author.tag;
                user.dsId = author.id;

                var reminder = new Reminder();
                var tiempo = args.pop();
                reminder.time = tiempo;
                reminder.message = args.join(" ");
                user.save((err, userStored) => {
                    if (err) {
                        console.log(err);
                    }
                    reminder.user = userStored._id;
                    reminder.save((err, reminderStored) => {
                        if (err) {
                            console.log(err);
                        }
                        // DEVOLVER RESPUESTA
                        return message.reply(`El mensaje "${args.join(" ")}" se recordará cada ${tiempo} minutos. Si quieres eliminar el recordatorio escribe /borrarrecordatorio ${reminderStored._id}`);

                    });
                })
            } else {
                var reminder = new Reminder();
                var tiempo = args.pop();
                reminder.time = tiempo;
                reminder.message = args.join(" ");
                reminder.user = issetUser._id;
                reminder.save((err, reminderStored) => {
                    if (err) {
                        console.log(err);
                    }
                    // DEVOLVER RESPUESTA
                    return message.reply(`El mensaje "${args.join(" ")}" se recordará cada ${tiempo} minutos. Si quieres eliminar el recordatorio escribe /borrarrecordatorio ${reminderStored._id}`);

                });
            }



        });

    }
}