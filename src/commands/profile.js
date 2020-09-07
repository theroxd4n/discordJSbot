module.exports = {
    name: 'changeAvatar',
    description : 'Comando para cambiar el avatar del bot.',
    execute(client, message, args){
        image = message.attachments.first().url;
        client.user.setAvatar(image);
    }
}