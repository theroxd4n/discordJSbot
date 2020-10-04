var Reminder = require('../models/reminder');
var User = require('../models/user');
var moment = require('moment')
const mongoose = require("mongoose");
const { PREFIX } = require('../config.json');


module.exports = {
    name: 'crearrecordatorio',
    description: 'Comando para añadir recordatorios.',
    usage: `${PREFIX}crearrecordatorio MENSAJE (DD-MM-YY/h:mm). Por ejemplo: /crearrecordatorio Ir a la compra (02-09-2020/05:31)`,
    execute(message, args) {
        let dateTimeReg = /\(\d{1,2}-\d{1,2}-\d{4}\/\d{1,2}:\d{2}\)/;
        var day = moment(args[args.length - 1], "(DD-MM-YYYY/h:mm)");
        if ((args.length < 2) || (!dateTimeReg.test(args[args.length - 1]))) return message.reply(`debes usar el comando de la siguiente manera: \`\`\`${this.usage}\`\`\``);
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
                reminder.date = day.toDate();
                reminder.message = args.slice(0, args.length - 2).join(" ");
                user.save((err, userStored) => {
                    if (err) {
                        console.log(err);
                    }
                    reminder.user = userStored._id;
                    reminder.save((err, reminderStored) => {
                        if (err) {
                            console.log(err);
                        }
                        var CronJob = require('cron').CronJob;
                        var job = new CronJob(reminder.date, function () {
                            message.reply('TIENES UN NUEVO RECORDATORIO:' + reminder.message);
                            Reminder.deleteOne({ _id: doc._id }, function (err) {
                                if (err) return handleError(err);
                                // deleted at most one tank document
                            });
                            job.stop();
                        }, null, true, 'Europe/Madrid');
                        job.start();

                        // DEVOLVER RESPUESTA
                        return message.reply(`El mensaje "${args.join(" ")}" se recordará el día ${moment(reminderStored.date).format('LLL')}. Si quieres eliminar el recordatorio escribe /borrarrecordatorio ${reminderStored._id}`);
                    });
                })
            } else {
                var reminder = new Reminder();
                reminder.date = day.toDate();
                reminder.message = args.slice(0, args.length - 2).join(" ");
                reminder.user = issetUser._id;
                reminder.save().then((doc) => {
                    try {
                        var CronJob = require('cron').CronJob;
                        var job = new CronJob(reminder.date, function () {
                            message.reply('TIENES UN NUEVO RECORDATORIO: ' + reminder.message);
                            Reminder.deleteOne({ _id: doc._id }, function (err) {
                                if (err) return console.log(err);

                            });
                            job.stop();
                        }, null, true, 'Europe/Madrid');
                        job.start();
                    } catch (e) {
                        return message.reply("Ya ha sido esa fecha.")
                    }

                    // DEVOLVER RESPUESTA
                    return message.reply(`El mensaje "${args.join(" ")}" se recordará el día ${moment(doc.date).format('LLL')}. Si quieres eliminar el recordatorio escribe /borrarrecordatorio ${doc._id}`);
                });
            }



        });

    }
}