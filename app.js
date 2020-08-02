const client = require('discord.js').Client();
const settings = require('./settings.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if (msg.content = 'ping') msg.reply('pong');
});

client.login(settings.token);