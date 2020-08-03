const fs = require('fs');
const settings = require('./settings.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


client.on('message', msg => {
    if (!msg.content.startsWith(settings.prefix) || msg.author.bot) return; // If not a command and not send by the bot
    
    const args = msg.content.slice(settings.prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    if (!client.commands.has(cmdName)) return; // Command does not exist

    const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if (!cmd) return;

    if (cmd.args && !args.length) {
        return msg.reply(`ik mis een aantal argumenten. ${cmd.usage}`);
    }

    try {
        cmd.execute(msg, args, client);
    } catch (error) {
        console.error(error);
        msg.reply('lekker bezig, bot is stuk');
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