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
const ConfigFile = require("../config");
const Menus = require("../data/menus");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./record.sqlite');
// Load client and declare variable
const client = this.Client;
let gameChoice = undefined;
let event = undefined;
let eventTime = undefined;
const menus = [];
// Function to load the menus
// @menusPath: /path/to/commandFolder
function loadMenus(menusPath) {
    // Stop if no commands
    if (!ConfigFile.config ||
        ConfigFile.config.menus.length === 0) {
        return;
    }
    // Loop through to find command in config file
    for (const menuName of ConfigFile.config.menus) {
        const menuClass = require(`${menusPath}/${menuName}`).default;
        const menu = new menuClass();
        menus.push(menu);
    }
}
// Function to run the menu when chosen
// Params from Discord
function handleMenu(msg, user) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for and call next menu choice
        const menu = `${gameChoice}`.toLowerCase();
        // Save the event ID as argument to pass to next module
        const args = [`${event.id}`];
        for (const menuClass of menus) {
            try {
                // Check if our command class is the right one
                if (!menuClass.isThisCommand(menu)) {
                    continue;
                }
                // Run command
                // @args: event ID from database
                // @msg: message object
                // @client: Discord Client
                // @user: the original discord user
                yield menuClass.runCommand(args, msg, client, user);
            }
            catch (exception) {
                // IfError, log it
                console.log(exception);
            }
        }
    });
}
loadMenus(`${__dirname}/menus`);
class Poll {
    constructor() {
        this._menu = 'poll';
    }
    help() {
        // eslint-disable-next-line quotes
        return `Basic poll thingy`;
    }
    isThisCommand(command) {
        return command === this._menu;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    runCommand(args, msgObject, _client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield msgObject.delete(0);
            const eventTitle = args;
            yield msgObject.channel.send('What time would you like this to start?').then(() => __awaiter(this, void 0, void 0, function* () {
                yield msgObject.channel.awaitMessages(response => response.content, { maxMatches: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                    eventTime = collected.first().content;
                    console.log(`Time is ${eventTime}. Title is ${eventTitle}`);
                })
                    .catch(collected => console.log('Error'));
            }));
            // Get current time for ID purposes
            const theTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // Create event in database
            event = { id: `${msgObject.author.id}-${theTime}`, user: msgObject.author.username, title: `${eventTitle}`, startTime: `${eventTime}` };
            const newEvent = sql.prepare('INSERT OR REPLACE INTO eventLog (id, user, title, startTime) VALUES (?, ?, ?, ?);');
            const info = newEvent.run(`${event.id}`, `${event.user}`, `${event.title}`, `${eventTime}`);
            console.log(`Command ${this._menu} created id ${event.id} and was started by ${msgObject.author.username}.`);
            console.log(info.changes);
            // Send first menu
            const pollEmbed = Menus.menus[0].gameMenu;
            const pollMessage = yield msgObject.channel.send(pollEmbed);
            // Add reactions to serve as menu choices
            // Reactions from config file so I don't have to remember the unicode
            yield pollMessage.react(ConfigFile.config.reactionNumbers[1]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[2]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[3]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[4]);
            // Filter to ignore reactions not part of the menu, and to ensure the bot doesn't try to answer itself
            const filter = (reaction, user) => {
                return ([
                    ConfigFile.config.reactionNumbers[1],
                    ConfigFile.config.reactionNumbers[2],
                    ConfigFile.config.reactionNumbers[3],
                    ConfigFile.config.reactionNumbers[4],
                    ConfigFile.config.reactionNumbers[5],
                    ConfigFile.config.reactionNumbers[6],
                    ConfigFile.config.reactionNumbers[7],
                    ConfigFile.config.reactionNumbers[8],
                    ConfigFile.config.reactionNumbers[9],
                ].includes(reaction.emoji.name) && user.id === msgObject.author.id);
            };
            // Menu is created - now we're waiting user's choice
            yield pollMessage
                .awaitReactions(filter, { max: 1, time: 60000 })
                .then((collected) => __awaiter(this, void 0, void 0, function* () {
                const reaction = collected.first();
                try {
                    // User choses Destiny 2
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
                        reaction.remove(reaction.users.filter(u => u === msgObject.author).first());
                        // Log and add choice to database
                        gameChoice = 'Destiny2';
                        console.log(`${msgObject.author.username} chose ${gameChoice}`);
                        const gameResult = sql.prepare('UPDATE eventLog SET game = ? WHERE id = ?;');
                        const eventGame = gameResult.run(`${gameChoice}`, `${event.id}`);
                        console.log(eventGame.changes);
                        // Run Destiny2 Menu Module
                        handleMenu(pollMessage, msgObject.author);
                    }
                    // User chooses Overwatch
                    // TODO: Build Overwatch Menu - Code below is incomplete
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
                        gameChoice = 'Overwatch';
                        console.log(`${msgObject.author.username} chose ${gameChoice}`);
                        msgObject.channel.send('Overwatch Selected');
                        pollMessage.edit(Menus.destinyMenus[0].destinyMain);
                        return;
                    }
                }
                catch (_a) {
                    // If the user doesn't choose anything after the time limit, delete menu
                    msgObject.channel.send('No selection in time!');
                    console.log('After a minute, no answers');
                    pollMessage.delete(0);
                }
            }));
        });
    }
}
exports.default = Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLHlDQUF5QztBQUV6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTFDLG1DQUFtQztBQUNuQyxNQUFNLE1BQU0sR0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDM0IsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUUxQixNQUFNLEtBQUssR0FBZSxFQUFFLENBQUM7QUFFN0IsNkJBQTZCO0FBQzdCLHFDQUFxQztBQUNyQyxTQUFTLFNBQVMsQ0FBQyxTQUFpQjtJQUNsQyxzQkFBc0I7SUFDdEIsSUFDRSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1FBQ2pCLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUNsRDtRQUNBLE9BQU87S0FDUjtJQUVELDhDQUE4QztJQUM5QyxLQUFLLE1BQU0sUUFBUSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBaUIsRUFBRTtRQUMxRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxTQUFTLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFOUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQWMsQ0FBQztRQUV6QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQUVELHVDQUF1QztBQUN2QyxzQkFBc0I7QUFDdEIsU0FBZSxVQUFVLENBQUMsR0FBb0IsRUFBRSxJQUFrQjs7UUFFaEUsdUNBQXVDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFH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