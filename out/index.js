"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var ConfigFile = require("./config");
require('dotenv').config();
var BOT_TOKEN = process.env.BOT_TOKEN;
var client = new Discord.Client();
client.on('ready', function () {
    // Online Message
    console.log('Ready to go!');
});
client.on("message", function (msg) {
    // Not from bot
    if (msg.author.bot) {
        return;
    }
    // Also look for prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    msg.channel.send(msg.author.username + " just used a command!");
});
client.login(BOT_TOKEN);
