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
const Menus = require("../../data/menus");
const ConfigFile = require("../.././config");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./record.sqlite');
let activityChoice = undefined;
let levelChoice = undefined;
class Destiny2 {
    constructor() {
        this._menu = 'destiny2';
    }
    help() {
        return 'Destiny Menus';
    }
    isThisCommand(menu) {
        return menu === this._menu;
    }
    runCommand(args, msgObject, client, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // First: Retrieve the event information from our database
            const dbEntry = args[0];
            const stmt = sql.prepare('SELECT * FROM eventLog WHERE id = ?');
            const event = stmt.get(`${args[0]}`);
            console.log(`Menu ${this._menu} started by ${event.user}.`);
            const pollMessage = yield msgObject.edit(Menus.destinyMenus[0].destinyMain);
            const filter = (reaction) => {
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
                ].includes(reaction.emoji.name) && user.id === user.id);
            };
            yield pollMessage
                .awaitReactions(filter, { max: 1, time: 60000 })
                .then((collected) => __awaiter(this, void 0, void 0, function* () {
                const reaction = collected.first();
                try {
                    // Destiny 2
                    // Gambit Chosen
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
                        reaction.remove(reaction.users.filter(u => u === user).first());
                        activityChoice = 'Gambit';
                        const activityResult = sql.prepare('UPDATE eventLog SET activity = ?, playerCount = ? WHERE id = ?;');
                        const eventActivity = activityResult.run(`${activityChoice}`, 4, `${event.id}`);
                        console.log(eventActivity.changes);
                        console.log(`${user.username} chose ${activityChoice}`);
                        // Run Gambit Menu
                        yield pollMessage.edit(Menus.destinyMenus[1].destinyGambit);
                        yield pollMessage
                            .clearReactions();
                        yield pollMessage.react(ConfigFile.config.reactionNumbers[1]);
                        yield pollMessage.react(ConfigFile.config.reactionNumbers[2]);
                        yield pollMessage.react(ConfigFile.config.reactionNumbers[3]);
                        yield pollMessage
                            .awaitReactions(filter, { max: 1, time: 60000 })
                            // eslint-disable-next-line no-shadow
                            .then((levelCollected) => __awaiter(this, void 0, void 0, function* () {
                            // eslint-disable-next-line no-shadow
                            const reactionLevel = levelCollected.first();
                            try {
                                // Level menu
                                if (reactionLevel.emoji.name === ConfigFile.config.reactionNumbers[1]) {
                                    reactionLevel.remove(reactionLevel.users.filter(u => u === user).first());
                                    levelChoice = 'Gambit';
                                }
                                if (reactionLevel.emoji.name === ConfigFile.config.reactionNumbers[2]) {
                                    reactionLevel.remove(reactionLevel.users.filter(u => u === user).first());
                                    levelChoice = 'Gambit Prime';
                                }
                                if (reactionLevel.emoji.name === ConfigFile.config.reactionNumbers[3]) {
                                    reactionLevel.remove(reactionLevel.users.filter(u => u === user).first());
                                    levelChoice = 'The Reckoning';
                                }
                                const levelResult = sql.prepare('UPDATE eventLog SET level = ? WHERE id = ?;');
                                const eventLevel = levelResult.run(`${levelChoice}`, `${event.id}`);
                                console.log(eventLevel.changes);
                                console.log(`${user.username} chose ${levelChoice}`);
                            }
                            catch (_b) {
                                msgObject.channel.send('General error');
                                console.log('Something went wrong at level');
                            }
                        }));
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
exports.default = Destiny2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdGlueTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWVudXMvZGVzdGlueTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDBDQUEwQztBQUMxQyw2Q0FBNkM7QUFDN0MseUNBQXlDO0FBQ3pDLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFMUMsSUFBSSxjQUFjLEdBQVcsU0FBUyxDQUFDO0FBQ3ZDLElBQUksV0FBVyxHQUFXLFNBQVMsQ0FBQztBQUVwQyxNQUFxQixRQUFRO0lBQTdCO1FBQ21CLFVBQUssR0FBRyxVQUFVLENBQUM7SUF1SHRDLENBQUM7SUFySEMsSUFBSTtRQUNGLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0IsRUFBRSxJQUFrQjs7WUFFckcsMERBQTBEO1lBQzFELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxRQUFRLElBQUksQ0FBQyxLQUFLLGVBQWUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUMvQyxDQUFDO1lBR0YsTUFBTSxXQUFXLEdBQUcsTUFBTyxTQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWpH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