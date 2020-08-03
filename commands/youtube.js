const ytdl = require('ytdl-core-discord');
const voice = require('../utils/voice');
const queue = require('../utils/queue');
const settings = require('../settings.json');

module.exports = {
    name: 'youtube',
    description: 'Speelt een nummer af van youtube',
    args: true,
    args_length: 1,
    usage: `${settings.prefix}youtube <YOUTUBE LINK> [repeat]`,
    //TODO random oofs in vc
    execute: async (msg, args, client, previousSong) => {
        client.youtube.getPlaylist('https://www.youtube.com/playlist?list=PLPCszAEiaMsKjwrBKV-xxxANuiOxqvisO')
            .then(playlist => {
                console.log(`The playlist's title is ${playlist.title}`);
                playlist.getVideos()
                    .then(videos => {
                        console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
                    })
                    .catch(console.log);
        })
        .catch(console.log);   
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
            } else {
                await queue.getAndRemoveFirst(guild, client)
                    .then(song => this.execute(msg, [song.link], client))
                    .catch(err => voice.finish(msg, dispatcher));
            }
        })
    }
}