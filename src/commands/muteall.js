module.exports = {
    name: 'muteall',
    description: 'Comando para mutear a todos los miembros de un canal',
    execute(message, args) {
        if (message.member.roles.cache.has('748606234432766094')) {
            message.guild.roles.fetch("757218833999069215").then((role) => {
                let channel = message.member.voice.channel;

                channel.members.forEach(member => {
                    member.voice.setMute(true).then(() => {
                        console.log(member.user.username + " ha sido muteado.");
                    }).catch(e => console.log(e));
                });
            }).catch(e => console.log(e));
        } else {
            message.reply("No tienes permisos para mutear a todo el canal.")
        }
    }
}