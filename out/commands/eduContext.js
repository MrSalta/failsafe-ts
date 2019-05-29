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
let response;
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
            const sourceChannel = msgObject.channel.id;
            console.log(imageURL);
            // Contextifier prompt embed
            const contextMaker = {
                'title': 'The Contextifier!',
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
                    response = collected.first().content;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWR1Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9lZHVDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxJQUFJLFFBQVEsQ0FBQztBQUViLE1BQXFCLFVBQVU7SUFBL0I7UUFFbUIsZUFBVSxHQUFHLFlBQVksQ0FBQTtJQThFNUMsQ0FBQztJQTVFQyxJQUFJO1FBQ0YsT0FBTyxpRUFBaUUsQ0FBQztJQUMzRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQVksRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxnRkFBZ0Y7WUFDaEYsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDO1lBQzVCLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEIsNEJBQTRCO1lBQzVCLE1BQU0sWUFBWSxHQUFHO2dCQUNuQixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixhQUFhLEVBQUUsa0JBQWtCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJO29CQUM1RCx5RUFBeUU7b0JBQ3pFLDREQUE0RDtvQkFDNUQsSUFBSSxHQUFHLHdDQUF3QztnQkFDakQsT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxRQUFRO2lCQUNoQjthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU0sTUFBTSxFQUFDLEVBQUU7Z0JBQzNGLGlCQUFpQjtnQkFDakIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDdEU7Z0JBQ0QscUNBQXFDO2dCQUNyQyxNQUFPLE1BQTBCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztxQkFDckksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNoQixRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFFckMscUJBQXFCO29CQUNyQixNQUFNLFdBQVcsR0FBRzt3QkFDbEIsT0FBTyxFQUFFLDRCQUE0Qjt3QkFDckMsV0FBVyxFQUFFOzRCQUNYLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVM7eUJBQ2xDO3dCQUNELGFBQWEsRUFBRSxpQkFBaUI7NEJBQzlCLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLDJFQUEyRTs0QkFDdkcsYUFBYTs0QkFDYixJQUFJLEdBQUcsMENBQTBDO3dCQUNuRCxPQUFPLEVBQUU7NEJBQ1AsS0FBSyxFQUFFLFFBQVE7eUJBQ2hCO3dCQUNELFFBQVEsRUFBRTs0QkFDUjtnQ0FDRSxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxLQUFLLEVBQUUsUUFBUTs2QkFDaEI7NEJBQ0Q7Z0NBQ0UsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLE9BQU8sRUFBRSxHQUFHOzZCQUNiO3lCQUNGO3FCQUNGLENBQUM7b0JBQ0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFeEIsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixDQUFDO1lBQ04sQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBR25ELENBQUM7S0FBQTtDQUNGO0FBaEZELDZCQWdGQyJ9