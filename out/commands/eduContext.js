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
const client = new Discord.Client();
class EduContext {
    constructor() {
        this._noContext = 'eduContext';
    }
    help() {
        // eslint-disable-next-line quotes
        return `Prompts the user (usually Edu) to provide context for the image`;
    }
    isThisCommand(command) {
        return command === this._noContext;
    }
    // eslint-disable-next-line no-shadow
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const ogID = yield msgObject.id;
            const imageURL = yield args;
            const contextMaker = {
                'title': 'The Contextifier!',
                'description': `Hello @${msgObject.author.username}! It looks like you were posting this image without any sort of context. Please reply with some context, and I'll post your image.`,
                'image': {
                    'url': imageURL,
                },
            };
            // Did it work?
            console.log(imageURL);
            yield msgObject.channel.fetchMessage(ogID).then(msg => msg.delete());
            const sourceChannel = msgObject.channel.id;
            const promptEmbed = yield msgObject.author.send({ embed: contextMaker }).then(() => __awaiter(this, void 0, void 0, function* () {
                yield promptEmbed.channel.awaitMessages(response => response.content, { maxMatches: 1, time: 120000, errors: ['time'] })
                    .then(collected => {
                    const response = collected.first().content;
                    console.log(response);
                })
                    .catch(collected => console.log('Error'));
            }));
            console.log(ogID);
        });
    }
}
exports.default = EduContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWR1Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9lZHVDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFJdEMsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXBELE1BQXFCLFVBQVU7SUFBL0I7UUFFbUIsZUFBVSxHQUFHLFlBQVksQ0FBQTtJQXlDNUMsQ0FBQztJQXZDQyxJQUFJO1FBQ0Ysa0NBQWtDO1FBQ2xDLE9BQU8saUVBQWlFLENBQUM7SUFDM0UsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDckMsQ0FBQztJQUVELHFDQUFxQztJQUMvQixVQUFVLENBQUMsSUFBWSxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQztZQUM1QixNQUFNLFlBQVksR0FBRztnQkFDbkIsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsYUFBYSxFQUFFLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLG9JQUFvSTtnQkFDdEwsT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxRQUFRO2lCQUNoQjthQUNGLENBQUM7WUFFRixlQUFlO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sV0FBVyxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBUyxFQUFFO2dCQUN2RixNQUFPLFdBQTBDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztxQkFDckosSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNoQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQ3JCLENBQUM7WUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUdwQixDQUFDO0tBQUE7Q0FDRjtBQTNDRCw2QkEyQ0MifQ==