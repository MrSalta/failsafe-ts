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
const BOT_TOKEN = process.env.BOT_TOKEN;
const client = new Discord.Client();
const commands = [];
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
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
});
client.on('message', msg => {
    // Not from bot
    if (msg.author.bot) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBRXhDLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVwRCxNQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFDO0FBRW5DLFNBQWUsYUFBYSxDQUFDLEdBQW9COztRQUU3Qyw2QkFBNkI7UUFDN0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxLQUFLLE1BQU0sWUFBWSxJQUFJLFFBQVEsRUFBRTtZQUVqQyxtREFBbUQ7WUFDbkQsSUFBSTtnQkFFQSw4Q0FBOEM7Z0JBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUV0QyxxQkFBcUI7b0JBQ3JCLFNBQVM7aUJBQ1o7Z0JBRUQsY0FBYztnQkFDZCxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNwRDtZQUNELE9BQU8sU0FBUyxFQUFFO2dCQUVkLGtCQUFrQjtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQjtTQUNKO0lBQ0wsQ0FBQztDQUFBO0FBRUQsU0FBUyxZQUFZLENBQUMsWUFBb0I7SUFFdEMsc0JBQXNCO0lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBcUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQUUsT0FBTztLQUFFO0lBRTVGLDhDQUE4QztJQUM5QyxLQUFLLE1BQU0sV0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBb0IsRUFBRTtRQUU5RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxZQUFZLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFeEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLEVBQWlCLENBQUM7UUFFbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMxQjtBQUNMLENBQUM7QUFFRCxZQUFZLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUVwQixpQkFBaUI7SUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBRXZCLGVBQWU7SUFDZixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQUUsT0FBTztLQUFFO0lBRS9CLHVCQUF1QjtJQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUVsRSxxQkFBcUI7SUFDckIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyJ9