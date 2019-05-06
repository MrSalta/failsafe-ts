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
            const bc = yield msgObject.channel.send(`${gameChoice}`);
            console.log(`${msgObject.id}`);
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
                        msgObject.edit(`${gameChoice} -> ${activityChoice}`);
                        // Run Gambit Menu
                        pollMessage.edit(Menus.destinyMenus[0].destinyMain);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdGlueTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWVudXMvZGVzdGlueTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDBDQUEwQztBQUMxQyw2Q0FBNkM7QUFFN0MsSUFBSSxjQUFjLEdBQVcsU0FBUyxDQUFDO0FBQ3ZDLE1BQXFCLFFBQVE7SUFBN0I7UUFDbUIsVUFBSyxHQUFHLFVBQVUsQ0FBQztJQXlFdEMsQ0FBQztJQXZFQyxJQUFJO1FBQ0YsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQixFQUFFLElBQWtCOztZQUNyRyxPQUFPLENBQUMsR0FBRyxDQUNULFFBQVEsSUFBSSxDQUFDLEtBQUssZUFBZSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQ2xELENBQUM7WUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxXQUFXLEdBQUcsTUFBTyxTQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pHLE1BQU0sRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUvQixNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQWlDLEVBQUUsRUFBRTtnQkFDbkQsT0FBTyxDQUNMO29CQUNFLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDcEMs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