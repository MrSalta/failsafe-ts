import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import * as ConfigFile from '../config';
import * as Menus from '../data/menus';

export default class DestinyMenu implements IBotCommand {

  private readonly _command = 'destiny 2'

  help(): string {
    return 'Destiny Menus';
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    console.log(`Menu ${this._command} started by ${msgObject.author.username}.`);

    const args = 
  }
  }
}