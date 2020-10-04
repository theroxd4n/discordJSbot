var Reminder = require('../models/reminder');
var User = require('../models/user');
const mongoose = require("mongoose");
const { PREFIX } = require('../config.json');
var moment = require('moment')
module.exports = {
    name: 'misrecordatorios',
    description: 'Comando para ver mis recordatorios.',
    usage: `${PREFIX}misrecordatorios`,
    execute(message, args) {

        var author = message.author;
        User.findOne({ dsId: author.id }, (err, issetUser) => {
            if (err) {
                return message.reply("se ha producido un error.")
            }
            if (!issetUser) {
                return message.reply("no estas registrado en la base de datos. Para hacerlo, crea un recordatorio.")
            }

            Reminder.find({user : issetUser._id}).exec((err, reminders) => {
                if (err | reminders.length == 0) {
                    let str = "```diff\r\n- No tienes recordatorios. Por favor, añade uno.\r\n```"
                    return message.reply(str);
                } else {
                    var messageStr = "";
                    moment.locale('ES'); 
                    reminders.forEach(reminder => {
                        var newMessage = `\`\`\`[${moment(reminder.date).format('LLL')}] ${reminder._id}: ${reminder.message}\`\`\``;
                        messageStr = messageStr + newMessage;
                    })
                    return message.reply(messageStr);
                }
                
            });

        });

    }
}