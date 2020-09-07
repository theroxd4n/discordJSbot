module.exports = {
    name: 'ping',
    description : 'Esto es el comando ping',
    execute(message, args){
        message.channel.send('PING');
    }
}