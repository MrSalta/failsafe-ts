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
        const args = msg.content.split(' ').slice(1);
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
client.on('message', msg => {
    // Not from bot
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == 'dm') {
        return;
    }
    // Also look for prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    // Handle the command
    handleCommand(msg);
});
client.login(BOT_TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLHlDQUF5QztBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBRXhDLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVwRCxNQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFDO0FBRW5DLFNBQWUsYUFBYSxDQUFDLEdBQW9COztRQUUvQyw2QkFBNkI7UUFDN0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlGLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxLQUFLLE1BQU0sWUFBWSxJQUFJLFFBQVEsRUFBRTtZQUVuQyxpRUFBaUU7WUFDakUsSUFBSTtnQkFFRiw4Q0FBOEM7Z0JBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUV4QyxxQkFBcUI7b0JBQ3JCLFNBQVM7aUJBQ1Y7Z0JBRUQsY0FBYztnQkFDZCxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUVsRDtZQUNELE9BQU8sU0FBUyxFQUFFO2dCQUVoQixrQkFBa0I7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDeEI7U0FDRjtJQUNILENBQUM7Q0FBQTtBQUVELFNBQVMsWUFBWSxDQUFDLFlBQW9CO0lBRXhDLHNCQUFzQjtJQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQXFCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUU1Riw4Q0FBOEM7SUFDOUMsS0FBSyxNQUFNLFdBQVcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQW9CLEVBQUU7UUFFaEUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsWUFBWSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRXhFLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxFQUFpQixDQUFDO1FBRW5ELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEI7QUFDSCxDQUFDO0FBRUQsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFFdEIsaUJBQWlCO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFNUIsMEJBQTBCO0lBQzFCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0ZBQWtGLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwSCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3RCLHdFQUF3RTtRQUN4RSxHQUFHLENBQUMsT0FBTyxDQUFDLGtQQUFrUCxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdFEseURBQXlEO1FBQ3pELEdBQUcsQ0FBQyxPQUFPLENBQUMsd0RBQXdELENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1RSxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUV6QixlQUFlO0lBQ2YsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUUvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUFFLE9BQU87S0FBRTtJQUN6Qyx1QkFBdUI7SUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFBRSxPQUFPO0tBQUU7SUFFbEUscUJBQXFCO0lBQ3JCLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMifQ==