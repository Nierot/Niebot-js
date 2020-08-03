module.exports = {
    name: 'nee',
    description: 'Laat de bot stoppen met zingen',
    args: false,
    usage: 'yeet nee',
    async execute(msg, args) {
        await msg.guild.voice.channel.leave();
    }
}