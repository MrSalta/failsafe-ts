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
const cfg = require("../config");
class EduContext {
    constructor() {
        this._noContext = 'eduContext';
    }
    help() {
        return 'Prompts the user (usually Edu) to provide context for the image';
    }
    isThisCommand(command) {
        return command === this._noContext;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            // First grab information about the original message so we can put it back later
            const ogID = yield msgObject.id;
            const imageURL = yield args;
            console.log(imageURL);
            // Contextifier prompt embed
            const contextMaker = {
                'title': 'The Contextifier!',
                'color': cfg.config.colors.failsafe,
                'description': `😄: Greetings, ${msgObject.author.username}! ` +
                    'It looks like you were posting this image without any sort of context. ' +
                    'Please reply with some context, and I\'ll post your image.' +
                    '\n' + '😒: If it really means so much to you.',
                'image': {
                    'url': imageURL,
                },
            };
            const promptEmbed = yield msgObject.author.send({ embed: contextMaker }).then((posted) => __awaiter(this, void 0, void 0, function* () {
                // Delete message
                if (posted) {
                    yield msgObject.channel.fetchMessage(ogID).then(msg => msg.delete());
                }
                // eslint-disable-next-line no-shadow
                yield posted.channel.awaitMessages(response => response.content, { maxMatches: 1, time: 500000, errors: ['time'] })
                    .then(collected => {
                    const response = collected.first().content;
                    // Contextified embed
                    const withContext = {
                        'title': 'Contextified Post Incoming',
                        'thumbnail': {
                            'url': msgObject.author.avatarURL,
                        },
                        'description': '😄: Greetings! ' +
                            `${msgObject.author.username} wanted to share this image with you, but forgot to provide any context. ` +
                            'Here it is!' +
                            '\n' + '😒: *sigh* ... You\'re welcome, I guess.',
                        'image': {
                            'url': imageURL,
                        },
                        'color': cfg.config.colors.failsafe,
                        'fields': [
                            {
                                name: '\u200b',
                                value: '\u200b',
                            },
                            {
                                'name': response,
                                'value': '.',
                            },
                        ],
                    };
                    msgObject.channel.send({ embed: withContext });
                    console.log(response);
                })
                    .catch(collected => console.log('Error'));
            }));
            console.log(ogID);
            yield msgObject.author.send('It has been sent!');
        });
    }
}
exports.default = EduContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWR1Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9lZHVDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxpQ0FBaUM7QUFFakMsTUFBcUIsVUFBVTtJQUEvQjtRQUVtQixlQUFVLEdBQUcsWUFBWSxDQUFBO0lBK0U1QyxDQUFDO0lBN0VDLElBQUk7UUFDRixPQUFPLGlFQUFpRSxDQUFDO0lBQzNFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBWSxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRS9FLGdGQUFnRjtZQUNoRixNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0Qiw0QkFBNEI7WUFDNUIsTUFBTSxZQUFZLEdBQUc7Z0JBQ25CLE9BQU8sRUFBRSxtQkFBbUI7Z0JBQzVCLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUNuQyxhQUFhLEVBQUUsa0JBQWtCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJO29CQUM1RCx5RUFBeUU7b0JBQ3pFLDREQUE0RDtvQkFDNUQsSUFBSSxHQUFHLHdDQUF3QztnQkFDakQsT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxRQUFRO2lCQUNoQjthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU0sTUFBTSxFQUFDLEVBQUU7Z0JBQzNGLGlCQUFpQjtnQkFDakIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDdEU7Z0JBQ0QscUNBQXFDO2dCQUNyQyxNQUFPLE1BQTBCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztxQkFDckksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNoQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUUzQyxxQkFBcUI7b0JBQ3JCLE1BQU0sV0FBVyxHQUFHO3dCQUNsQixPQUFPLEVBQUUsNEJBQTRCO3dCQUNyQyxXQUFXLEVBQUU7NEJBQ1gsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUzt5QkFDbEM7d0JBQ0QsYUFBYSxFQUFFLGlCQUFpQjs0QkFDOUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsMkVBQTJFOzRCQUN2RyxhQUFhOzRCQUNiLElBQUksR0FBRywwQ0FBMEM7d0JBQ25ELE9BQU8sRUFBRTs0QkFDUCxLQUFLLEVBQUUsUUFBUTt5QkFDaEI7d0JBQ0QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVE7d0JBQ25DLFFBQVEsRUFBRTs0QkFDUjtnQ0FDRSxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxLQUFLLEVBQUUsUUFBUTs2QkFDaEI7NEJBQ0Q7Z0NBQ0UsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLE9BQU8sRUFBRSxHQUFHOzZCQUNiO3lCQUNGO3FCQUNGLENBQUM7b0JBQ0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFeEIsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixDQUFDO1lBQ04sQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBR25ELENBQUM7S0FBQTtDQUNGO0FBakZELDZCQWlGQyJ9