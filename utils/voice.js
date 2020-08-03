module.exports = {
    /**
     * Joins the voicechannel for given context,
     * @returns a voice connection
     */
    join: async msg => {
        if (!msg.member.voice.channel) msg.channel.send('Je bent niet in een voice kanaal')
        return await msg.member.voice.channel.join();
    },

    leave: async msg => {
        await msg.guild.voice.channel.leave();
    }
}