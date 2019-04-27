import * as Discord from 'discord.js';
import * as ConfigFile from './config';
import { IBotCommand } from './api';
require('dotenv').config();
const BOT_TOKEN = process.env.BOT_TOKEN;

const client: Discord.Client = new Discord.Client();

const commands: IBotCommand[] = [];

async function handleCommand(msg: Discord.Message) {

    // Split string into the args
    const command = msg.content.split(' ')[0].replace(ConfigFile.config.prefix, '');
    const args = msg.content.split(' ').slice(1);

    for (const commandClass of commands) {

        // Attempt to execute, but ready for it not to work
        try {

            // Check if our command class is the right one
            if (!commandClass.isThisCommand(command)) {

                // Keep looping if no
                continue;
            }

            // Run command
            await commandClass.runCommand(args, msg, client);
        }
        catch (exception) {

            // IfError, log it
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string) {

    // Stop if no commands
    if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    // Loop through to find command in config file
    for (const commandName of ConfigFile.config.commands as string[]) {

        const commandsClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand;

        commands.push(command);
    }
}

loadCommands(`${__dirname}/commands`);

client.on('ready', () => {

    // Online Message
    console.log('Ready to go!');
});

client.on('message', msg => {

    // Not from bot
    if (msg.author.bot) { return; }

    // Also look for prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    // Handle the command
    handleCommand(msg);
});

client.login(BOT_TOKEN);