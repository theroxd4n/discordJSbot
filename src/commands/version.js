const { VERSION } = require('../config.json');

module.exports = {
    name: 'version',
    description : 'Comando para saber cual es la versión actual del bot.',
    execute(message, args){
        message.channel.send(`La versión actual del bot es: ${VERSION}`);
    }
}