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
            const eventTitle = args.slice(0, args.length).join(' ');
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