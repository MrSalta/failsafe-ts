"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
require('dotenv').config();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./record.sqlite');
const BOT_TOKEN = process.env.BOT_TOKEN;
const client = new Discord.Client();
const commands = [];
const delay = ms => new Promise(res => setTimeout(res, ms));
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        // Split string into the args
        const command = msg.content.split(' ')[0].replace(ConfigFile.config.prefix, '').toLowerCase();
        const string = msg.content.split(' ').slice(1);
        const args = string.slice(0, string.length).join(' ');
        for (const commandClass of commands) {
            // Attempt to execute, but ready for it not to go well or younkow
            try {
                // Check if our command class is the right one
                if (!commandClass.isThisCommand(command)) {
                    // Keep looping if no
                    continue;
                }
                // Run command
                yield commandClass.runCommand(args, msg, client);
            }
            catch (exception) {
                // IfError, log it
                console.log(exception);
            }
        }
    });
}
function imageContext(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        // Split string into the args
        const command = 'eduContext';
        const args = msg.attachments.first().url;
        for (const commandClass of commands) {
            // Attempt to execute, but ready for it not to go well or younkow
            try {
                // Check if our command class is the right one
                if (!commandClass.isThisCommand(command)) {
                    // Keep looping if no
                    continue;
                }
                // Run command
                yield commandClass.runCommand(args, msg, client);
            }
            catch (exception) {
                // IfError, log it
                console.log(exception);
            }
        }
    });
}
function tweetContext(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        // Split string into the args
        const command = 'tweetContext';
        const args = msg.embeds[0];
        for (const commandClass of commands) {
            // Attempt to execute, but ready for it not to go well or younkow
            try {
                // Check if our command class is the right one
                if (!commandClass.isThisCommand(command)) {
                    // Keep looping if no
                    continue;
                }
                // Run command
                yield commandClass.runCommand(args, msg, client);
            }
            catch (exception) {
                // IfError, log it
                console.log(exception);
            }
        }
    });
}
function loadCommands(commandsPath) {
    // Stop if no commands
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    // Loop through to find command in config file
    for (const commandName of ConfigFile.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
    }
}
loadCommands(`${__dirname}/commands`);
client.on('ready', () => {
    // Online Message
    console.log('Ready to go!');
    // Initialize Menu Storage
    const table = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'eventLog\';').get();
    if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare('CREATE TABLE eventLog (id TEXT PRIMARY KEY, title TEXT, channel TEXT, user TEXT, game TEXT, activity TEXT, level TEXT, startTime TEXT, playerCount INTEGER, player1 TEXT, player2 TEXT, player3 TEXT, player4 TEXT, player5 TEXT, player6 TEXT);').run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare('CREATE UNIQUE INDEX idx_eventLogs_id ON eventLog (id);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
    }
});
client.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
    // Not from bot
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == 'dm') {
        return;
    }
    if (msg.attachments.size > 0) {
        if (msg.content == '') {
            yield imageContext(msg);
        }
    }
    if (msg.content.includes('twitter')) {
        yield delay(1000);
        if (msg.embeds.length > 0 && (msg.content.split(' ')).length <= 2) {
            yield tweetContext(msg);
        }
    }
    // Also look for prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    // Handle the command
    handleCommand(msg);
}));
client.login(BOT_TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLHlDQUF5QztBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBRXhDLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVwRCxNQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFDO0FBRW5DLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFNUQsU0FBZSxhQUFhLENBQUMsR0FBb0I7O1FBRS9DLDZCQUE2QjtRQUM3QixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUYsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEQsS0FBSyxNQUFNLFlB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