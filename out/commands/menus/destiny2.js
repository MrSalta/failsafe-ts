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
                        pollMessage.edit(Menus.destinyMenus[1].destinyGambit);
                    }
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
                        console.log(`${msgObject.author.username} chose ${event.game}`);
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
exports.default = Destiny2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdGlueTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWVudXMvZGVzdGlueTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDBDQUEwQztBQUMxQyw2Q0FBNkM7QUFDN0MseUNBQXlDO0FBQ3pDLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFMUMsSUFBSSxjQUFjLEdBQVcsU0FBUyxDQUFDO0FBRXZDLE1BQXFCLFFBQVE7SUFBN0I7UUFDbUIsVUFBSyxHQUFHLFVBQVUsQ0FBQztJQStFdEMsQ0FBQztJQTdFQyxJQUFJO1FBQ0YsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQixFQUFFLElBQWtCOztZQUVyRywwREFBMEQ7WUFDMUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNoRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUNULFFBQVEsSUFBSSxDQUFDLEtBQUssZUFBZSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQy9DLENBQUM7WUFHRixNQUFNLFdBQVcsR0FBRyxNQUFPLFNBQTZCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFakcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFpQyxFQUFF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