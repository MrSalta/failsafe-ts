import * as Discord from 'discord.js';
import { IBotContext } from '../api';
import * as config from '../config';

export default class EduContext implements IBotContext {

  private readonly _noContext = 'tweetContext'

  help(): string {
    return 'Prompts the user (usually Edu) to provide context for the tweet';
  }

  isThisCommand(command: string): boolean {
    return command === this._noContext;
  }

  async runCommand(args: any, msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    // First grab information about the original message so we can put it back later
    const ogID = await msgObject.id;
    const ogEmbed = await args;

    // TODO - Check for at

    // Contextifier prompt embed

    const promptEmbed = await msgObject.author.send(`😄: Greetings, ${msgObject.author.username}! ` +
      'It looks like you were posting this tweet without any sort of context. ' +
      'Please reply with some context, and I\'ll post your image.' +
      '\n' + '😒: If it really means so much to you.', { embed: ogEmbed }).then(async posted => {
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
        .catch(collected =>
          console.log('Error')
        );
    });

    console.log(ogID);
    await msgObject.author.send('It has been sent!');


  }
}
