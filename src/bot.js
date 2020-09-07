require('dotenv').config();

const Discord = require('discord.js');

const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(__dirname + '/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const { PREFIX } = require('./config.json');
const bannedWords = require('./bannedWords')

client.on('ready', () => {
    console.log(`${client.user.tag} ha iniciado sesión.`);
});

client.on('message', (message) => {
    if (message.author.bot) return;

    if (bannedWords.some(substring => message.content.includes(substring))) {
        message.delete({ timeout: 1 })
            .then(message.channel.send('No se puede decir esa palabra.'))
            .catch(console.error);
    }


    // COMANDOS
    if (message.content.startsWith(PREFIX)) {

        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);

        switch (CMD_NAME) {
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
            default:
                message.channel.send('Ese comando no existe.');

        }

    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
