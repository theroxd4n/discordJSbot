const { PREFIX } = require('../config.json');
module.exports = {
    name: 'unmuteall',
    description: 'Comando para desmutear a todos los miembros de un canal.',
    usage: `${PREFIX}unmuteall`,
    execute(message, args) {
        if (message.member.roles.cache.has('748606234432766094')) {
            message.guild.roles.fetch("757218833999069215").then((role) => {
                let channel = message.member.voice.channel;

                channel.members.forEach(member => {
                    member.voice.setMute(false).then(() => {
                        console.log(member.user.username + " ha sido desmuteado.");
                    }).catch(e => console.log(e));
                });
            }).catch(e => console.log(e));

        } else {
            message.reply("No tienes permisos para desmutear a todo el canal.")
        }
    }
}