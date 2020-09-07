const fetch = require('node-fetch');

module.exports = {
    name: 'tiempo',
    description : 'Comando para consultar el tiempo actual en cualquier parte del mundo.',
    execute(message, args){
        let query = args.join(' ');
            let apiCoords = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.GEOCODING_API_KEY}&language=es`;
            
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