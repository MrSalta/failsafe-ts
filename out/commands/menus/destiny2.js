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
            console.log(`Menu ${this._menu} started by ${user.username}.`);
            const gameChoice = args[0];
            const pollMessage = yield msgObject.edit(Menus.destinyMenus[0].destinyMain);
            yield msgObject.channel.send(`${gameChoice}`);
            const bc = yield msgObject.id;
            yield console.log(`${bc}`);
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
                        console.log(`${user.username} chose ${activityChoice}`);
                        // Run Gambit Menu
                        pollMessage.edit(Menus.destinyMenus[1].destinyGambit);
                    }
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
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
exports.default = Destiny2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdGlueTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWVudXMvZGVzdGlueTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDBDQUEwQztBQUMxQyw2Q0FBNkM7QUFFN0MsSUFBSSxjQUFjLEdBQVcsU0FBUyxDQUFDO0FBRXZDLE1BQXFCLFFBQVE7SUFBN0I7UUFDbUIsVUFBSyxHQUFHLFVBQVUsQ0FBQztJQXlFdEMsQ0FBQztJQXZFQyxJQUFJO1FBQ0YsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQixFQUFFLElBQWtCOztZQUNyRyxPQUFPLENBQUMsR0FBRyxDQUNULFFBQVEsSUFBSSxDQUFDLEtBQUssZUFBZSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQ2xELENBQUM7WUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxXQUFXLEdBQUcsTUFBTyxTQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTNCLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBaUMsRUFBRSxFQUFFO2dCQUNuRCxPQUFPLENBQ0w7b0JBQ0UsVUFBVSxDQUFDLE1BQU0sQ0FBQyxl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