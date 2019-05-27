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
const menus = [];
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
function handleMenu(msg, user) {
    return __awaiter(this, void 0, void 0, function* () {
        // Split string into the args
        const menu = `${gameChoice}`.toLowerCase();
        const args = [`${event.id}`];
        for (const menuClass of menus) {
            // Attempt to execute, but ready for it not to go well or younkow
            try {
                // Check if our command class is the right one
                if (!menuClass.isThisCommand(menu)) {
                    // Keep looping if no
                    continue;
                }
                // Run command
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
            // Get current time for ID purposes
            const theTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // Create event in database
            event = { id: `${msgObject.author.id}-${theTime}`, user: msgObject.author.username };
            const newEvent = sql.prepare('INSERT OR REPLACE INTO eventLog (id, user) VALUES (?, ?);');
            const info = newEvent.run(`${event.id}`, `${event.user}`);
            console.log(`Command ${this._menu} created id ${event.id} and was started by ${msgObject.author.username}.`);
            console.log(info.changes);
            // Format check
            if (args.length < 1) {
                return;
            }
            // Send first menu
            const pollEmbed = Menus.menus[0].gameMenu;
            const pollMessage = yield msgObject.channel.send(pollEmbed);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[1]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[2]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[3]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[4]);
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
            yield pollMessage
                .awaitReactions(filter, { max: 1, time: 60000 })
                .then((collected) => __awaiter(this, void 0, void 0, function* () {
                const reaction = collected.first();
                try {
                    // Destiny 2
                    // Game Menu
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
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
                        gameChoice = 'Overwatch';
                        console.log(`${msgObject.author.username} chose ${gameChoice}`);
                        msgObject.channel.send('Overwatch Selected');
                        pollMessage.edit(Menus.destinyMenus[0].destinyMain);
                        return;
                    }
                }
                catch (_a) {
                    msgObject.channel.send('No selection in time!');
                    console.log('After a minute, no answers');
                    pollMessage.delete(0);
                }
            }));
        });
    }
}
exports.default = Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLHlDQUF5QztBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTFDLG1DQUFtQztBQUNuQyxNQUFNLE1BQU0sR0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDM0IsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLE1BQU0sS0FBSyxHQUFlLEVBQUUsQ0FBQztBQUM3QixTQUFTLFNBQVMsQ0FBQyxTQUFpQjtJQUNsQyxzQkFBc0I7SUFDdEIsSUFDRSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1FBQ2pCLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUNsRDtRQUNBLE9BQU87S0FDUjtJQUVELDhDQUE4QztJQUM5QyxLQUFLLE1BQU0sUUFBUSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBaUIsRUFBRTtRQUMxRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxTQUFTLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFOUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQWMsQ0FBQztRQUV6QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQUVELFNBQWUsVUFBVSxDQUFDLEdBQW9CLEVBQUUsSUFBa0I7O1FBRWhFLDZCQUE2QjtRQUM3QixNQUFNLElBQUksR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxF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