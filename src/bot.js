require('dotenv').config();

const { Client } = require('discord.js');
const { Youtube, } = require('node-youtube-search');
const fetch = require('node-fetch');

const youtubeApi = new Youtube(process.env.YOUTUBE_API_TOKEN);

const client = new Client();

const { PREFIX, VERSION } = require('./config.json');
const bannedWords = require('./bannedWords')

client.on('ready', () => {
    console.log(`${client.user.tag} ha iniciado sesión.`);
});

client.on('message', (message) => {
    if (message.author.bot) return;
    
    if (bannedWords.some(substring=>message.content.includes(substring))) {
        message.delete({ timeout: 1 })
            .then(message.channel.send('No se puede decir esa palabra.'))
            .catch(console.error);
    }

    if (message.content === 'Notice me senpai') return message.channel.send("Nani?", { files: ["https://images-na.ssl-images-amazon.com/images/I/51Y3DucY3QL._AC_SL1000_.jpg"] });

    // COMANDOS
    if (message.content.startsWith(PREFIX)) {

        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);


        // Musica

        if (CMD_NAME === 'musica') {
            message.channel.send(args);
        }

        if (CMD_NAME === 'version') return message.channel.send(`La versión actual del bot es: ${VERSION}`);

        // Expulsar
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
        }
        // Banear
        if (CMD_NAME === 'ban') {
            message.channel.send(`${args[0]} ha sido baneado.`);
        }

        // Cambiar avatar del bot
        if (CMD_NAME === 'profile') {
            image = message.attachments.first().url;
            client.user.setAvatar(image);
        }
        // Recordatorio
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

        // Bizum
        if (CMD_NAME === 'bizum') {
            message.channel.send(`${message.author}, hermosos pies nena, te doy 20 euros por Bizum.`)
        }

        // Cumplido
        if (CMD_NAME === 'cumplido') {
            message.channel.send(`${message.author}, eres maravilloso/a!`);
        }

        // Buscador Youtube
        if (CMD_NAME === 'youtube') {
            youtubeApi.search(args.join(' ')).then((results) => {
                if (results.length === 0) return message.reply('no se han encontrado videos con esa búsqueda.')
                message.channel.send(`https://www.youtube.com/watch?v=${results[0].id}`);
            }).catch((err) => console.log(err));
        }

        // Tarot
        if (CMD_NAME === 'tarot') return message.reply('da igual lo que hagas, vas a morir.', { files : ['https://media.discordapp.net/attachments/678349790819385369/752135154755043428/150px-Cary-Yale_Tarot_deck_-_Death.jpg']});

        // Tiempo
        if (CMD_NAME === 'tiempo') {
            let query = args.join(' ');
            let apiCoords = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.GEOCODING_API_KEY}&language=es`;
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            

            fetch(apiCoords)
                .then(res => res.json())
                .then(json => {
                    if (json.results.length === 0) return message.reply(`No he podido encontrar informacion para "${query}"`);
                    let city = json.results[0].formatted;
                
                    let apiWeather = `https://api.darksky.net/forecast/97483878f9ee91e366314435c2505e26/${json.results[0].geometry.lat},${json.results[0].geometry.lng}?units=si&lang=es`;
                
                    
                    fetch(apiWeather).then(res => { return res.json() }).then(data => {
                        const { temperature, summary, icon } = data.currently;
                        var msg = `Actualmente, en "${city}" hace ${Math.round(temperature)}°C. ${summary}`;
                        switch (icon) {
                            case 'clear-day':
                            case 'clear-night':
                                msg = msg.concat(' :sunny:.');
                                break;
                            case 'rain':
                                msg = msg.concat(' :cloud_rain:.');
                                break;
                            case 'snow':
                            case 'sleet':
                                msg = msg.concat(' :cloud_snow:.');
                                break;
                            case 'wind':
                                msg = msg.concat(' :dash:.');
                                break;
                            case 'fog':
                                msg = msg.concat(' :fog:.');
                                break;
                            case 'cloudy':
                                msg = msg.concat(' :cloud:.');
                                break;
                            case 'partly-cloudy-day':
                            case 'partly-cloudy-night':
                                msg = msg.concat(' :partly_sunny:.');
                                break;
                            default:
                                msg = msg.concat(' :earth_africa:.');
                        }
                        message.reply(msg);
                    }).catch((err) => {
                        console.log(err);
                        message.reply('No he podido obtener los datos del tiempo. Intentalo de nuevo.')
                    });
                });
        }
    } 
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
