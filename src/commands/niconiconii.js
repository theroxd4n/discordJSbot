const { PREFIX } = require('../config.json');
module.exports = {
    name: 'niconiconii',
    description : 'Comandito molon.',
    usage: `${PREFIX}niconiconii`,
    execute(message, args){
        message.channel.send('https://www.youtube.com/watch?v=pBd90XZ6UYg');
    }
}




