module.exports = {
    /**
     * Joins the voicechannel for given context,
     * @returns a voice connection
     */
    join: async msg => {
        if (!msg.member.voice.channel) msg.channel.send('Je bent niet in een voice kanaal')
        return await msg.member.voice.channel.join();
    },

    /**
     * Leaves the voice channel
     */
    leave: async msg => {
        await msg.guild.voice.channel.leave();
    },

    /**
     * Leaves the voice channel and destroys the dispatcher
     */
    finish: (msg, dispatcher) => {
        console.log('finished playing')
        this.leave(msg);
        dispatcher.destroy();
    }
}