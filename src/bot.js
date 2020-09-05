require('dotenv').config();


const { Client, MessageAttachment } = require('discord.js');

const { Youtube, } = require('node-youtube-search');

const youtubeApi = new Youtube(process.env.YOUTUBE_API_TOKEN);
const fetch = require('node-fetch');

const client = new Client();
const PREFIX = '/';

client.on('ready', () => {
    console.log(`${client.user.tag} ha iniciado sesión.`);
});

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {

        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
        if (CMD_NAME === 'kick') {
            if (message.member.hasPermission('KICK_MEMBERS')) return message.reply('No tienes permisos para banear a usuarios.')
            if (args.length === 0) return message.reply('Escribe el ID del usuario.');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member.kick()
                    .then((member) => message.channel.send(`${member} ha sido expulsado del servidor.`))
                    .catch((err) => message.channel.send('No tengo permisos para expulsar al usuario :('));
            } else {
                message.channel.send('Ese miembro no existe.')
            }
        } else if (CMD_NAME === 'ban') {
            message.channel.send(`${args[0]} ha sido baneado.`);
        }

        if (CMD_NAME === 'profile') {
            image = message.attachments.first().url;
            client.user.setAvatar(image);
        }

        // if(CMD_NAME === 'recordatorio') {
        //     console.log(args);
        //     message.channel.send(`Cada ${args[0]} segundos te enviaré el siguiente recordatorio: ${args[1]}`)
        //     myVar = setInterval(function(){ 
        //         message.reply(`${args[1]}`);
        //         client.on('message', (message) => {
        //             if (message.content === '/pararrecordatorio'){
        //                 clearInterval(myVar);
        //             }
        //         })


        //     }, args[0]*1000);
        // }
        if (CMD_NAME === 'bizum') {
            message.channel.send(`${message.author}, hermosos pies nena, te doy 20 euros por Bizum.`)

        }
        if (CMD_NAME === 'cumplido') {
            message.channel.send(`${message.author}, eres maravilloso/a!`);
        }
        if (CMD_NAME === 'youtube') {
            youtubeApi.search(args.join(' ')).then((results) => {
                if (results.length === 0) return message.reply('no se han encontrado videos con esa búsqueda.')
                message.channel.send(`https://www.youtube.com/watch?v=${results[0].id}`);
            }).catch((err) => console.log(err));

        }

        if (CMD_NAME === 'tiempo') {
            let query = args[0];
            let apiCoords = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.GEOCODING_API_KEY}&language=es`;
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            fetch(apiCoords)
                .then(res => res.json())
                .then(json => {
                    let city = json.results[0].formatted;
                    let apiWeather = `https://api.darksky.net/forecast/97483878f9ee91e366314435c2505e26/${json.results[0].geometry.lat},${json.results[0].geometry.lng}?units=si&lang=es`;
                    fetch(apiWeather).then(res => { return res.json() }).then(data => {
                        const { temperature, summary, icon } = data.currently;
                        message.reply(`Actualmente, en "${city}" hace ${Math.round(temperature)}°C. ${summary}.`)
                    }).catch((err) => {
                        console.log(err);
                        message.reply('No he podido obtener los datos del tiempo. Intentalo de nuevo.')
                    });
                });
        }
    }

    if (message.content.includes('polla')) {
        message.delete({ timeout: 1 })
            .then(message.channel.send('No se puede decir esa palabra.'))
            .catch(console.error);
    }




    if (message.content === 'Notice me senpai') return message.channel.send("Hola", { files: ["https://images-na.ssl-images-amazon.com/images/I/51Y3DucY3QL._AC_SL1000_.jpg"] })
})

client.login(process.env.DISCORDJS_BOT_TOKEN);
