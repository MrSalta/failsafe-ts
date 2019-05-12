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
const sql = new SQLite('../record.sqlite');
// Load client and declare variable
const client = this.Client;
let gameChoice = undefined;
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
        const args = [`${gameChoice}`];
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
    runCommand(args, msgObject, _client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield msgObject.delete(0);
            const theTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let event = undefined;
            event = { id: `${msgObject.author.id}-${theTime}, user: ${msgObject.author.username}` };
            console.log(`Command ${this._menu} created id ${event.id} and was started by ${msgObject.author.username}.`);
            if (args.length < 1) {
                return;
            }
            const pollDesc = args.join(' ');
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
                .then(collected => {
                const reaction = collected.first();
                try {
                    // Destiny 2
                    // Game Menu
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
                        reaction.remove(reaction.users.filter(u => u === msgObject.author).first());
                        gameChoice = 'Destiny2';
                        console.log(`${msgObject.author.username} chose ${gameChoice}`);
                        sql.exec(`INSERT INTO events WHERE id = ${event.id} (game) VALUES (${gameChoice});`);
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
            });
        });
    }
}
exports.default = Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLHlDQUF5QztBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTNDLG1DQUFtQztBQUNuQyxNQUFNLE1BQU0sR0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDM0IsTUFBTSxLQUFLLEdBQWUsRUFBRSxDQUFDO0FBQzdCLFNBQVMsU0FBUyxDQUFDLFNBQWlCO0lBQ2xDLHNCQUFzQjtJQUN0QixJQUNFLENBQUMsVUFBVSxDQUFDLE1BQU07UUFDakIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFrQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ2xEO1FBQ0EsT0FBTztLQUNSO0lBRUQsOENBQThDO0lBQzlDLEtBQUssTUFBTSxRQUFRLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFpQixFQUFFO1FBQzFELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLFNBQVMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUU5RCxNQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBYyxDQUFDO1FBRXpDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBQ0QsU0FBZSxVQUFVLENBQUMsR0FBb0IsRUFBRSxJQUFrQjs7UUFFaEUsNkJBQTZCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDL0IsS0FBSyxNQUFNLFNBQVMsSUFBSSxL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