import * as Discord from 'discord.js';
import { IBotContext } from '../api';

export default class EduContext implements IBotContext {

  private readonly _noContext = 'eduContext'

  help(): string {
    return 'Prompts the user (usually Edu) to provide context for the image';
  }

  isThisCommand(command: string): boolean {
    return command === this._noContext;
  }

  async runCommand(args: string, msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    // First grab information about the original message so we can put it back later
    const ogID = await msgObject.id;
    const imageURL = await args;
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

    const promptEmbed = await msgObject.author.send({ embed: contextMaker }).then(async posted => {
      // Delete message
      if (posted) {
        await msgObject.channel.fetchMessage(ogID).then(msg => msg.delete());
      }
      // eslint-disable-next-line no-shadow
      await (posted as Discord.Message).channel.awaitMessages(response => response.content, { maxMatches: 1, time: 500000, errors: ['time'] })
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
        .catch(collected =>
          console.log('Error')
        );
    });

    console.log(ogID);
    await msgObject.author.send('It has been sent!');


  }
}
