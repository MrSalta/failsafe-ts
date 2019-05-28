import * as Discord from 'discord.js';
import { IBotContext } from '../api';
import * as ConfigFile from '../config';
import { encode } from 'punycode';
const client: Discord.Client = new Discord.Client();

export default class EduContext implements IBotContext {

  private readonly _noContext = 'eduContext'

  help(): string {
    // eslint-disable-next-line quotes
    return `Prompts the user (usually Edu) to provide context for the image`;
  }

  isThisCommand(command: string): boolean {
    return command === this._noContext;
  }

  // eslint-disable-next-line no-shadow
  async runCommand(args: string, msgObject: Discord.Message, client: Discord.Client): Promise<void> {
    const ogID = await msgObject.id;
    const imageURL = await args;
    const contextMaker = {
      'title': 'The Contextifier!',
      'description': `Hello @${msgObject.author.username}! It looks like you were posting this image without any sort of context. Please reply with some context, and I'll post your image.`,
      'image': {
        'url': imageURL,
      },
    };

    // Did it work?
    console.log(imageURL);
    await msgObject.channel.fetchMessage(ogID).then(msg => msg.delete());
    const sourceChannel = msgObject.channel.id;
    const promptEmbed = await msgObject.author.send({ embed: contextMaker }).then(async () => {
      await (promptEmbed as unknown as Discord.Message).channel.awaitMessages(response => response.content, { maxMatches: 1, time: 120000, errors: ['time'] })
        .then(collected => {
          const response = collected.first().content;
          console.log(response);
        })
        .catch(collected =>
          console.log('Error')
        );
    });
    console.log(ogID);


  }
}
