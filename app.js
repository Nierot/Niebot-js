const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('message', msg => {
    if (!msg.content.startsWith(settings.prefix) || msg.author.bot) return; // If not a command and not send by the bot
    
    const args = msg.content.slice(settings.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === 'ping') {
        msg.channel.send('pong');
    }
});


// Login and initialize
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(settings.token);