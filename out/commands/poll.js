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
const ConfigFile = require("../config");
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
            const pollEmbed = new Discord.RichEmbed()
                .setTitle('Poll')
                .setColor('purple')
                .setDescription(pollDesc);
            const pollMessage = yield msgObject.channel.send(pollEmbed);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[1]);
            yield pollMessage.react(ConfigFile.config.reactionNumbers[2]);
            const filter = (reaction, user) => reaction.emoji.name === ConfigFile.config.reactionNumbers[1] ||
                reaction.emoji.name === ConfigFile.config.reactionNumbers[2];
            try {
                const results = yield pollMessage.awaitReactions(filter, { time: 10000 });
                const resultsEmbed = new Discord.RichEmbed()
                    .setTitle('Poll Results')
                    .setDescription(`Results for Poll ${pollDesc}`)
                    .addField(`${ConfigFile.config.reactionNumbers[1]}`, `${results.get(ConfigFile.config.reactionNumbers[1]).count - 1} votes`)
                    .addField(`${ConfigFile.config.reactionNumbers[2]}`, `${results.get(ConfigFile.config.reactionNumbers[2]).count - 1} votes`);
                msgObject.channel.send(resultsEmbed);
                pollMessage.delete(0);
                console.log(`Results for poll "${pollDesc}" posted`);
                return;
            }
            catch (_a) {
                msgObject.channel.send('No results to the poll in time!');
                console.log('After 10 seconds, no answers');
                pollMessage.delete(0);
            }
        });
    }
}
exports.default = Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsd0NBQXdDO0FBRXhDLE1BQXFCLElBQUk7SUFBekI7UUFFbUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQXNEcEMsQ0FBQztJQXBEQyxJQUFJO1FBQ0Ysa0NBQWtDO1FBQ2xDLE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFakYsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsUUFBUSxlQUFlLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUVqRixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUVoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDdEMsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLE1BQU0sV0FBVyxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUQsTUFBTyxXQUErQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25GLE1BQU8sV0FBK0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRixNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQWlDLEVBQUUsSUFBa0IsRUFBRSxFQUFFLENBQ3ZFLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDNUQsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0QsSUFBSTtnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFPLFdBQStCLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUUvRixNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7cUJBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUM7cUJBQ3hCLGNBQWMsQ0FBQyxvQkFBb0IsUUFBUSxFQUFFLENBQUM7cUJBQzlDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDO3FCQUMzSCxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUvSCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDcEMsV0FBK0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLFFBQVEsVUFBVSxDQUFDLENBQUM7Z0JBQ3JELE9BQU87YUFDUjtZQUNELFdBQU07Z0JBQ0osU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUMzQyxXQUErQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUM7S0FBQTtDQUNGO0FBeERELHVCQXdEQyJ9