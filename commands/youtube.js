const ytdl = require('ytdl-core-discord');
const voice = require('../utils/voice');
const settings = require('../settings.json');

module.exports = {
    name: 'youtube',
    description: 'Speelt een nummer af van youtube',
    args: true,
    usage: 'yeet youtube <YOUTUBE LINK>',
    async execute(msg, args) {
        const conn = voice.join(msg);
        let music = undefined;
        await ytdl(args[0])
            .then(song => music = song)
            .catch(err => msg.channel.send('Dat is niet een youtube video'))
        setInterval(() => autoLeave(msg, conn), settings.autoLeaveInterval);
        conn.play(music, { type: 'opus' });
    }
}

function autoLeave(msg) {
    if (msg.guild.voice.channel.members.keyArray().length == 1) {
        msg.channel.send('Laat me hier niet alleen achter!')
        voice.leave();
    }
}