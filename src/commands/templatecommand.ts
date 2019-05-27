import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class TemplateCommand implements IBotCommand {

  private readonly _command = 'templatecommand'

  help(): string {
    // eslint-disable-next-line quotes
    return `This command doesn't do anything`;
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    // Did it work?
    msgObject.channel.send('All loaded and good.');
  }
}
