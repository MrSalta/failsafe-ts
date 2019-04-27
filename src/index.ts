import * as Discord from 'discord.js';
import * as ConfigFile from './config';
require('dotenv').config();
const BOT_TOKEN = process.env.BOT_TOKEN;

const client: Discord.Client = new Discord.Client();

client.on('ready', () => {

    // Online Message
    console.log('Ready to go!');
});

client.on("message", msg => {

    // Not from bot
    if (msg.author.bot) { return; }

    // Also look for prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    msg.channel.send(`${msg.author.username} just used a command!`);
})

client.login(BOT_TOKEN);