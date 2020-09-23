const { PREFIX } = require('../config.json');
module.exports = {
    name: 'changeAvatar',
    description : 'Comando para cambiar el avatar del bot.',
    usage: `${PREFIX}changeAvatar como comentario adjunto a una imagen`,
    execute(client, message, args){
        image = message.attachments.first().url;
        client.user.setAvatar(image);
    }
}