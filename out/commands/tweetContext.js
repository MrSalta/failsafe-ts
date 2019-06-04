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
class EduContext {
    constructor() {
        this._noContext = 'tweetContext';
    }
    help() {
        return 'Prompts the user (usually Edu) to provide context for the tweet';
    }
    isThisCommand(command) {
        return command === this._noContext;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            // First grab information about the original message so we can put it back later
            const ogID = yield msgObject.id;
            const ogEmbed = yield args;
            // Contextifier prompt embed
            const promptEmbed = yield msgObject.author.send(`😄: Greetings, ${msgObject.author.username}! ` +
                'It looks like you were posting this tweet without any sort of context. ' +
                'Please reply with some context, and I\'ll post your image.' +
                '\n' + '😒: If it really means so much to you.', { embed: ogEmbed }).then((posted) => __awaiter(this, void 0, void 0, function* () {
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
                        'author': ogEmbed.author,
                        'description': ogEmbed.description,
                        'footer': ogEmbed.footer,
                        'url': ogEmbed.url,
                        'type': ogEmbed.type,
                        'fields': [
                            {
                                name: '\u200b',
                                value: '\u200b',
                            },
                            {
                                'name': `Context from ${msgObject.author.username}:`,
                                'value': response,
                            },
                            {
                                'name': msgObject.content,
                                'value': '.',
                            },
                        ],
                    };
                    msgObject.channel.send('😄: Greetings! ' +
                        `${msgObject.author.username} wanted to share this tweet with you, but forgot to provide any context. ` +
                        'Here it is!' +
                        '\n' + '😒: *sigh* ... You\'re welcome, I guess.', { embed: withContext });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXRDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3R3ZWV0Q29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsTUFBcUIsVUFBVTtJQUEvQjtRQUVtQixlQUFVLEdBQUcsY0FBYyxDQUFBO0lBc0U5QyxDQUFDO0lBcEVDLElBQUk7UUFDRixPQUFPLGlFQUFpRSxDQUFDO0lBQzNFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBUyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRTVFLGdGQUFnRjtZQUNoRixNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUM7WUFFM0IsNEJBQTRCO1lBRTVCLE1BQU0sV0FBVyxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJO2dCQUM3Rix5RUFBeUU7Z0JBQ3pFLDREQUE0RDtnQkFDNUQsSUFBSSxHQUFHLHdDQUF3QyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU0sTUFBTSxFQUFDLEVBQUU7Z0JBQ3pGLGlCQUFpQjtnQkFDakIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDdEU7Z0JBQ0QscUNBQXFDO2dCQUNyQyxNQUFPLE1BQTBCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztxQkFDckksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNoQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUUzQyxxQkFBcUI7b0JBQ3JCLE1BQU0sV0FBVyxHQUFHO3dCQUNsQixRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU07d0JBQ3hCLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVzt3QkFDbEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNO3dCQUN4QixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7d0JBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSTt3QkFDcEIsUUFBUSxFQUFFOzRCQUNSO2dDQUNFLElBQUksRUFBRSxRQUFRO2dDQUNkLEtBQUssRUFBRSxRQUFROzZCQUNoQjs0QkFDRDtnQ0FDRSxNQUFNLEVBQUUsZ0JBQWdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHO2dDQUNwRCxPQUFPLEVBQUUsUUFBUTs2QkFDbEI7NEJBQ0Q7Z0NBQ0UsTUFBTSxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dDQUN6QixPQUFPLEVBQUUsR0FBRzs2QkFDYjt5QkFDRjtxQkFDRixDQUFDO29CQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQjt3QkFDcEMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsMkVBQTJFO3dCQUN2RyxhQUFhO3dCQUNiLElBQUksR0FBRywwQ0FBMEMsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV4QixDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQ3JCLENBQUM7WUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFHbkQsQ0FBQztLQUFBO0NBQ0Y7QUF4RUQsNkJBd0VDIn0=