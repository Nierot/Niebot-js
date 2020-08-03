const queue = require('../utils/queue');
const settings = require('../settings.json');

module.exports = {
    name: 'queue',
    description: 'Voegt een nummer toe aan de queue',
    args: true,
    args_length: 2,
    usage: `${settings.prefix}queue <youtube | mp3> <bestand>`,
    execute: (msg, args, client) => {
        queue.queue(args[0], args[1], msg.author.id, msg.guild.id, client);
    }
}