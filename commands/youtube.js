const ytdl = require('ytdl-core-discord');
const voice = require('../utils/voice');
const queue = require('../utils/queue');

module.exports = {
    name: 'youtube',
    description: 'Speelt een nummer af van youtube',
    args: true,
    args_length: 1,
    usage: 'yeet youtube <YOUTUBE LINK> [repeat]',
    async execute(msg, args, client, previousSong) {
        const conn = await voice.join(msg);
        let music = previousSong ? undefined : previousSong;
        let repeat = args[1] ? true : false
        let guild = msg.guild.id;
        
        if (!music) {
            await ytdl(args[0])
            .then(song => music = song)
            .catch(err => msg.channel.send('Dat is niet een youtube video'))
        }

        const dispatcher = conn.play(music, { type: 'opus' });

        dispatcher.on('finish', async () => {
            if (repeat) {
                this.execute(msg, args, client, music);
            } else if (client.queue[guild] && client.queue[guild].length != 0) {
                await queue.getAndRemoveFirst(guild, client)
                    .then(song => this.execute(msg, [song.link], client))
                    .catch(err => finish(msg, dispatcher));
            } else {
                finish(msg, dispatcher);
            }
        })
    }
}

function finish(msg, dispatcher) {
    console.log('finished playing')
    voice.leave(msg);
    dispatcher.destroy();
}