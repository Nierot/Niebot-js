const settings = require('../settings.json');

module.exports = {
    name: 'pause',
    description: 'Gooit alle slechte muziek uit de queue',
    aliases: ['vot'],
    args: false,
    usage: `${settings.prefix}pause`,
    execute: async (msg, args, client) => {
        console.log(`Clearing ${msg.guild.id}'s queue`);
        msg.reply('doeg slechte muziek');
        client.queue[msg.guild.id] = [];
    }
}