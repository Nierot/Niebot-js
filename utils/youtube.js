const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(settings.youtubeApiToken);

module.exports = {
    getPlaylist: async url => {
        let res = [];
        await youtube.getPlaylist(url)
            .then(playlist => playlist.getVideos())
            .then(videos => videos.forEach(video => res.push(video.url)))
            .catch(console.error)
        return res;
    }
}