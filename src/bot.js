require('dotenv').config();


const { Client, MessageAttachment } = require('discord.js');

const { Youtube, } = require('node-youtube-search');

const youtubeApi = new Youtube(process.env.YOUTUBE_API_TOKEN);

const client = new Client();
const PREFIX = '/';

client.on('ready', ()  => {
    console.log(`${client.user.tag} ha iniciado sesión.`);
});

client.on('message', (message) => {
    if(message.author.bot) return;
    if (message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(CMD_NAME === 'kick') {
            if (message.member.hasPermission('KICK_MEMBERS')) return message.reply('No tienes permisos para banear a usuarios.')
            if (args.length === 0) return message.reply('Escribe el ID del usuario.');
            const member = message.guild.members.cache.get(args[0]);
            if (member){
                member.kick()
                .then((member) => message.channel.send(`${member} ha sido expulsado del servidor.`))
                .catch((err) => message.channel.send('No tengo permisos para expulsar al usuario :('));
            } else {
                message.channel.send('Ese miembro no existe.')
            }
        } else if(CMD_NAME === 'ban'){
            message.channel.send(`${args[0]} ha sido baneado.`);
        }

        if (CMD_NAME === 'profile'){
            image = message.attachments.first().url;
            client.user.setAvatar(image);
        }

        if(CMD_NAME === 'pastillas') {
            message.channel.send(`Cada ${args[0]} segundos enviaré un recordatorio para que te tomes las pastillas.`)
            myVar = setInterval(function(){ 
                message.channel.send("Fer, tómate las pastillas");
                client.on('message', (message) => {
                    if (message.content === '/pararpastillas'){
                        clearInterval(myVar);
                    }
                })
            
            
            }, args[0]*1000);
        }
        if(CMD_NAME === 'bizum') {
            message.channel.send(`${message.author}, hermosos pies nena, te doy 20 euros por Bizum.`)
            
        }
        if(CMD_NAME === 'cumplido') {
            message.channel.send(`${message.author}, eres maravilloso/a!`);}
            if(CMD_NAME === 'youtube') {
                youtubeApi.search(args.join(' ')).then((results) => {
                    if (results.length === 0) return message.reply('no se han encontrado videos con esa búsqueda.')
                    message.channel.send(`https://www.youtube.com/watch?v=${results[0].id}`);
                }).catch((err)=> console.log(err));
                
            }
    }

    if (message.content.includes('polla')) {
        message.delete({ timeout: 1 })
  .then(message.channel.send('No se puede decir esa palabra.'))
  .catch(console.error);
     }




    if (message.content === 'Notice me senpai') return message.channel.send("Hola",{files:  ["https://images-na.ssl-images-amazon.com/images/I/51Y3DucY3QL._AC_SL1000_.jpg"]})
})

client.login(process.env.DISCORDJS_BOT_TOKEN);
