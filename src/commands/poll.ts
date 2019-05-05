import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import * as ConfigFile from '../config';
import * as Menus from '../data/menus';

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

    const pollEmbed = Menus.menus[0].gameMenu;

    const pollMessage = await msgObject.channel.send(pollEmbed);

    await (pollMessage as Discord.Message).react(ConfigFile.config.reactionNumbers[1]);
    await (pollMessage as Discord.Message).react(ConfigFile.config.reactionNumbers[2]);
    await (pollMessage as Discord.Message).react(ConfigFile.config.reactionNumbers[3]);
    await (pollMessage as Discord.Message).react(ConfigFile.config.reactionNumbers[4]);

    const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
      return [
        ConfigFile.config.reactionNumbers[1],
        ConfigFile.config.reactionNumbers[2],
        ConfigFile.config.reactionNumbers[3],
        ConfigFile.config.reactionNumbers[4],
        ConfigFile.config.reactionNumbers[5],
        ConfigFile.config.reactionNumbers[6],
        ConfigFile.config.reactionNumbers[7],
        ConfigFile.config.reactionNumbers[8],
        ConfigFile.config.reactionNumbers[9],
      ].includes(reaction.emoji.name) && user.id === msgObject.author.id;
    };


    await (pollMessage as Discord.Message).awaitReactions(filter, { max: 1, time: 60000 })
      .then(collected => {
        const reaction = collected.first();

        try {
          // Destiny 2
          // Game Menu
          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
            reaction.remove(reaction.users.filter(u => u === msgObject.author).first());
            const gameChoice = 'Destiny 2';
            console.log(`${msgObject.author.username} chose ${gameChoice}`);
            msgObject.channel.send(`${gameChoice}`);
            (pollMessage as Discord.Message).edit(Menus.destinyMenus[1].destinyRaids)
            // Run Raid Menu  
            .then(async d2RaidMenu => {
                await (d2RaidMenu as Discord.Message).react(ConfigFile.config.reactionNumbers[3]);
                await (d2RaidMenu as Discord.Message).react(ConfigFile.config.reactionNumbers[4]);

                await (d2RaidMenu as Discord.Message).awaitReactions(filter, { max: 1, time: 60000 })
                .then(collected => {
                  const reaction = collected.first();

                  try{

                  // Raid Menu
                  
                  }


                })
              }
          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
            const gameChoice = 'Overwatch';
            console.log(`${msgObject.author.username} chose ${gameChoice}`);
            msgObject.channel.send('Overwatch Selected');
            (pollMessage as Discord.Message).edit(Menus.destinyMenus[0].destinyMain);
            return;
          }
        }
        catch {
          msgObject.channel.send('No selection in time!');
          console.log('After a minute, no answers');
          (pollMessage as Discord.Message).delete(0);
        }
      });
  }
}
