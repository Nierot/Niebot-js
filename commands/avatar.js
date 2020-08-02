module.exports = {
    name: 'avatar',
    description: 'Laat de pf zien van de persoon die je tagt',
    args: true,
    aliases: ['icon', 'pfp'],
    usage: 'yeet avatar @Niebot',
    execute(msg, args) {
        msg.guild.members.fetch(args[0].replace(/[<@!>]/g, ''))
        .then(user => msg.channel.send(user.user.avatarURL()))
        .catch(error => {
            msg.channel.send('Iets ging mis');
            console.error(error);
        });
    }
}