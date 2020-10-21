require('dotenv').config();
var io = require('socket.io')(5000);

const Discord = require('discord.js');

const mongoose = require('mongoose');

const PriorityQueue = require("./PriorityQueue");
const { fork } = require('child_process');

const fs = require('fs');
var User = require("./models/user");
var Reminder = require("./models/reminder");


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(__dirname + '/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const { PREFIX } = require('./config.json');
const bannedWords = require('./bannedWords')

var db = mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.1js1r.gcp.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
// var remindersQueue = new PriorityQueue();
// const child = fork(__dirname + '/listener');
// var query = Reminder.find({}).sort('date');
// query.then(function (docs) {
//     for (let element of docs) {
//         remindersQueue.enqueue(element, element.date)
//     }
// }).finally(() => {
//     child.send(remindersQueue);
//     child.on('message', (reminder) => {
//         child.send(remindersQueue);
//     });

io.on('connection', function (socket) {
    console.log("Conectado al socket");
})


client.on('ready', () => {
    console.log(`${client.user.tag} ha iniciado sesión.`);
});

client.on('message', (message) => {
    if (message.author.bot) return;

    // if (bannedWords.some(substring => message.content.includes(substring))) {
    //     message.delete({ timeout: 1 })
    //         .then(message.channel.send('No se puede decir esa palabra.'))
    //         .catch(console.error);
    // }


    // COMANDOS
    if (message.content.startsWith(PREFIX)) {

        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);

        switch (CMD_NAME) {
            case 'help':
                client.commands.get('help').execute(message, client, PREFIX);
                break;
            case 'juego':
                client.commands.get('juego').execute(message, args, io);
                break;
            case 'musica':
                message.channel.send(args);
                break;
            case 'version':
                client.commands.get('version').execute(message, args);
                break;
            case 'changeAvatar':
                client.commands.get('changeAvatar').execute(client, message, args);
                break;
            case 'youtube':
                client.commands.get('youtube').execute(message, args);
                break;
            case 'tiempo':
                client.commands.get('tiempo').execute(message, args);
                break;
            case 'niconiconii':
                client.commands.get('niconiconii').execute(message, args);
                break;
            case 'muteall':
                client.commands.get('muteall').execute(message, args);
                break;
            case 'unmuteall':
                client.commands.get('unmuteall').execute(message, args);
                break;
            case 'crearrecordatorio':
                client.commands.get('crearrecordatorio').execute(message, args, db);
                break;
            case 'borrarrecordatorio':
                client.commands.get('borrarrecordatorio').execute(message, args);
                break;
            case 'misrecordatorios':
                client.commands.get('misrecordatorios').execute(message, args);
                break;
            default:
                message.channel.send('Ese comando no existe.');

        }

    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);







