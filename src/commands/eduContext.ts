import * as Discord from 'discord.js';
import { IBotContext } from '../api';
import * as ConfigFile from '../config';

export default class EduContext implements IBotContext {

  private readonly _noContext = 'eduContext'

  help(): string {
    // eslint-disable-next-line quotes
    return `Prompts the user (usually Edu) to provide context for the image`;
  }

  isThisCommand(command: string): boolean {
    return command === this._noContext;
  }

  async runCommand(args: string, msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    const imageURL = args;
    // Did it work?
    console.log(imageURL);
    await msgObject.channel.send('It worked');
  }
}
