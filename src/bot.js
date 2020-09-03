require('dotenv').config()

const { Client } = require('discord.js')

const client = new Client();
const PREFIX = '/';

client.on('ready', ()  => {
    console.log(`${client.user.tag} ha iniciado sesión.`)
});

client.on('message', (message) => {
    if(message.author.bot) return;
    if (message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(CMD_NAME === 'kick') {
            message.channel.send('Kicked the user');
        } else if(CMD_NAME === 'ban'){
            message.channel.send('Banned the user');
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);
