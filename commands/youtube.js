const ytdl = require('ytdl-core-discord');
const voice = require('../utils/voice');

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
        conn.play(music, { type: 'opus' });
    }
}