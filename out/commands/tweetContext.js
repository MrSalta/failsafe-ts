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
const config = require("../config");
class TweetContext {
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
            // Check for the atmark to see if it's a reply versus a thread
            if (ogEmbed.description.startsWith('@')) {
                const threadEmbed = yield msgObject.author.send(`😄: Greetings, ${msgObject.author.username}! ` +
                    'It looks like you\'re posting a reply. How confusing! ' +
                    '\n' + '😒: So, like... I\'ve deleted it. Post the main tweet instead.', { embed: ogEmbed }).then((posted) => __awaiter(this, void 0, void 0, function* () {
                    // Delete message
                    if (posted) {
                        yield msgObject.channel.fetchMessage(ogID).then(msg => msg.delete());
                    }
                }));
                return;
            }
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
                        'color': config.config.colors.failsafe,
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
exports.default = TweetContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXRDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3R3ZWV0Q29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsb0NBQW9DO0FBRXBDLE1BQXFCLFlBQVk7SUFBakM7UUFFbUIsZUFBVSxHQUFHLGNBQWMsQ0FBQTtJQW9GOUMsQ0FBQztJQWxGQyxJQUFJO1FBQ0YsT0FBTyxpRUFBaUUsQ0FBQztJQUMzRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQVMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUU1RSxnRkFBZ0Y7WUFDaEYsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDO1lBRTNCLDhEQUE4RDtZQUM5RCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLFdBQVcsR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSTtvQkFDN0Ysd0RBQXdEO29CQUN4RCxJQUFJLEdBQUcsZ0VBQWdFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTSxNQUFNLEVBQUMsRUFBRTtvQkFDakgsaUJBQWlCO29CQUNqQixJQUFJLE1BQU0sRUFBRTt3QkFDVixNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO3FCQUN0RTtnQkFDSCxD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