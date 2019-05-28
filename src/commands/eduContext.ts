import * as Discord from 'discord.js';
import { IBotContext } from '../api';
import * as ConfigFile from '../config';
import { encode } from 'punycode';
let imageURL;

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
    await msgObject.delete();
    const contextMaker = new Discord.RichEmbed()
      .setTitle('The Contextifier!')
      .setImage(imageURL)
      .setThumbnail(imageURL)
      .setDescription(`Hello @${msgObject.author.username}! It looks like you were posting this image without any sort of context. Please reply with some context, and I'll post your image.`);

    imageURL = args;
    // Did it work?
    console.log(imageURL);
    const sourceChannel = msgObject.channel.id;
    await msgObject.author.send(contextMaker);
  }
}
