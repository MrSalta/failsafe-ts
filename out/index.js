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
    if (msg.embeds.length > 0 && (msg.content.split(' ')).length <= 2) {
        yield tweetContext(msg);
    }
    // Also look for prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    // Handle the command
    handleCommand(msg);
}));
client.login(BOT_TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLHlDQUF5QztBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBRXhDLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVwRCxNQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFDO0FBRW5DLFNBQWUsYUFBYSxDQUFDLEdBQW9COztRQUUvQyw2QkFBNkI7UUFDN0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlGLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRELEtBQUssTUFBTSxZQUFZLElBQUksUUFBUSxFQUFFO1lBRW5DLGlFQUFpRTtZQUNqRSxJQUFJO2dCQUVGLDhDQUE4QztnQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBRXhDLHFC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