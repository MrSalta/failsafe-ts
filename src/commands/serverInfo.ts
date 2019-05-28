import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class ServerInfo implements IBotCommand {

  private readonly _command = 'serverinfo'

  help(): string {
    // eslint-disable-next-line quotes
    return `This command doesn't do anything`;
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(args: string, msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    // Did it work?
    const embed = new Discord.RichEmbed()
      .setColor('#253b56')
      .setTitle('Server Info');

    msgObject.channel.send(embed)
      .catch(console.error);
  }
}
