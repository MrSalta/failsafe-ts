import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class TestCommand implements IBotCommand {

  private readonly _command = 'testCommand'
  help(): string {
    return 'This is just here for funzies.';
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(args: string, msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    // Just testing
    msgObject.channel.send('It worked!');
  }
}