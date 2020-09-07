const { Youtube, } = require('node-youtube-search');
const youtubeApi = new Youtube(process.env.YOUTUBE_API_TOKEN);

module.exports = {
    name: 'youtube',
    description : 'Comando para buscar videos en YouTube.',
    execute(message, args){
        youtubeApi.search(args.join(' ')).then((results) => {
            if (results.length === 0) return message.reply('no se han encontrado videos con esa búsqueda.')
            message.channel.send(`https://www.youtube.com/watch?v=${results[0].id}`);
        }).catch((err) => console.log(err));
    }
}