import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import * as ConfigFile from '../config';

export default class Poll implements IBotCommand {

  private readonly _command = 'poll'

  help(): string {
    // eslint-disable-next-line quotes
    return `Basic poll thingy`;
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    await msgObject.delete(0);
    console.log(`Command ${this._command} started by ${msgObject.author.username}.`);

    if (args.length < 1) { return; }

    const pollDesc = args.join(' ');

    const pollEmbed = new Discord.RichEmbed()
      .setTitle('Poll')
      .setColor('purple')
      .setDescription(pollDesc);

    const pollMessage = await msgObject.channel.send(pollEmbed);

    await (pollMessage as Discord.Message).react(ConfigFile.config.reactionNumbers[1]);
    await (pollMessage as Discord.Message).react(ConfigFile.config.reactionNumbers[2]);

    const filter = (reaction: Discord.MessageReaction, user: Discord.User) =>
      reaction.emoji.name === ConfigFile.config.reactionNumbers[1] ||
      reaction.emoji.name === ConfigFile.config.reactionNumbers[2];

    try {
      const results = await (pollMessage as Discord.Message).awaitReactions(filter, { time: 10000 });

      const resultsEmbed = new Discord.RichEmbed()
        .setTitle('Poll Results')
        .setDescription(`Results for Poll ${pollDesc}`)
        .addField(`${ConfigFile.config.reactionNumbers[1]}`, `${results.get(ConfigFile.config.reactionNumbers[1]).count - 1} votes`)
        .addField(`${ConfigFile.config.reactionNumbers[2]}`, `${results.get(ConfigFile.config.reactionNumbers[2]).count - 1} votes`);

      msgObject.channel.send(resultsEmbed);
      (pollMessage as Discord.Message).delete(0);
      console.log(`Results for poll "${pollDesc}" posted`);
      return;
    }
    catch {
      msgObject.channel.send('No results to the poll in time!');
      console.log('After 10 seconds, no answers');
      (pollMessage as Discord.Message).delete(0);
    }
  }
}