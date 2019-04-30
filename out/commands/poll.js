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
const Menus = require("./data/menus");
class Poll {
    constructor() {
        this._command = 'poll';
    }
    help() {
        // eslint-disable-next-line quotes
        return `Basic poll thingy`;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield msgObject.delete(0);
            console.log(`Command ${this._command} started by ${msgObject.author.username}.`);
            if (args.length < 1) {
                return;
            }
            const pollDesc = args.join(' ');
            const pollEmbed = Menus.menus[0].gameMenu;
            const pollMessage = yield msgObject.channel.send(pollEmbed);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[1]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[2]);
            const filter = (reaction, user) => {
                return [
                    ConfigFile.config.reactionNumbers[1],
                    ConfigFile.config.reactionNumbers[2],
                ].includes(reaction.emoji.name) && user.id === msgObject.author.id;
            };
            yield pollMessage.awaitReactions(filter, { max: 1, time: 60000 })
                .then(collected => {
                const reaction = collected.first();
                try {
                    // Choose Destiny 2
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
                        reaction.remove(reaction.users.filter(u => u === msgObject.author).first());
                        const gameChoice = 'Destiny 2';
                        console.log(`${msgObject.author.username} chose ${gameChoice}`);
                        msgObject.channel.send(`${gameChoice}`);
                        pollMessage.edit(Menus.destinyMenus[1].destinyRaids);
                        return;
                    }
                    if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
                        const gameChoice = 'Overwatch';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx3Q0FBd0M7QUFDeEMsc0NBQXNDO0FBRXRDLE1BQXFCLElBQUk7SUFBekI7UUFFbUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQWdFcEMsQ0FBQztJQTlEQyxJQUFJO1FBQ0Ysa0NBQWtDO1FBQ2xDLE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFakYsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsUUFBUSxlQUFlLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUVqRixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUVoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBRTFDLE1BQU0sV0FBVyxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUQsTUFBTyxXQUErQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25GLE1BQU8sV0FBK0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxl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