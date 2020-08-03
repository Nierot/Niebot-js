const settings = require('../settings.json');

module.exports = {
    name: 'resume',
    description: 'Resumes the player',
    aliases: ['speel'],
    args: false,
    usage: `${settings.prefix}resume`,
    execute: async (msg, args, client) => {
        msg.reply('sgoe');
        client.dispatchers[msg.guild.id].resume();
    }
}