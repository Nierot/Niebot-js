const fs = require('fs');
const settings = require('./settings.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


client.on('message', msg => {
    if (!msg.content.startsWith(settings.prefix) || msg.author.bot) return; // If not a command and not send by the bot
    
    const args = msg.content.slice(settings.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (!client.commands.has(cmd)) return; // Command does not exist

    try {
        client.commands.get(cmd).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('Lekker bezig, bot is stuk');
    }
});


// Login and initialize
client.on('ready', () => {
    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(settings.token);