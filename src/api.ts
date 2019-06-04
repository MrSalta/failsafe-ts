import * as Discord from 'discord.js';

export interface IBotCommand {
  help(): string;

  isThisCommand(command: string): boolean;

  runCommand(args: any, msgObject: Discord.Message, client: Discord.Client): Promise<void>;

}
export interface IBotMenu {
  help(): string;

  isThisCommand(menu: string): boolean;

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, user: Discord.User): Promise<void>;

}
export interface IBotContext {
  help(): string;

  isThisCommand(noContext: string): boolean;

  runCommand(args: any, msgObject: Discord.Message, client: Discord.Client): Promise<void>;

}