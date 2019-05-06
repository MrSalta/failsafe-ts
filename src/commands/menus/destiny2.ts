import * as Discord from 'discord.js';
import { IBotMenu } from '../../api';
import * as Menus from '../../data/menus';
import * as ConfigFile from '../.././config';

let activityChoice: string = undefined;

export default class Destiny2 implements IBotMenu {
  private readonly _menu = 'destiny2';

  help(): string {
    return 'Destiny Menus';
  }

  isThisCommand(menu: string): boolean {
    return menu === this._menu;
  }

  async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, user: Discord.User): Promise<void> {
    console.log(
      `Menu ${this._menu} started by ${user.username}.`
    );
    const gameChoice = args[0];
    const pollMessage = await (msgObject as Discord.Message).edit(Menus.destinyMenus[0].destinyMain);
    await msgObject.channel.send(`${gameChoice}`);
    const bc = await msgObject.id;
    await console.log(`${bc}`);

    const filter = (reaction: Discord.MessageReaction) => {
      return (
        [
          ConfigFile.config.reactionNumbers[1],
          ConfigFile.config.reactionNumbers[2],
          ConfigFile.config.reactionNumbers[3],
          ConfigFile.config.reactionNumbers[4],
          ConfigFile.config.reactionNumbers[5],
          ConfigFile.config.reactionNumbers[6],
          ConfigFile.config.reactionNumbers[7],
          ConfigFile.config.reactionNumbers[8],
          ConfigFile.config.reactionNumbers[9],
        ].includes(reaction.emoji.name) && user.id === user.id
      );
    };

    await (pollMessage as Discord.Message)
      .awaitReactions(filter, { max: 1, time: 60000 })
      .then(async collected => {
        const reaction = collected.first();

        try {
          // Destiny 2
          // Gambit Chosen
          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
            reaction.remove(
              reaction.users.filter(u => u === user).first()
            );
            activityChoice = 'Gambit';
            console.log(`${user.username} chose ${activityChoice}`);
            const Message = await msgObject.channel.fetchMessage(bc);
            await Message.edit(`${gameChoice} -> ${activityChoice}`);

            // Run Gambit Menu
            (pollMessage as Discord.Message).edit(Menus.destinyMenus[0].destinyMain);

          }


          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
            console.log(`${msgObject.author.username} chose ${gameChoice}`);
            msgObject.channel.send('Overwatch Selected');
            (pollMessage as Discord.Message).edit(
              Menus.destinyMenus[0].destinyMain
            );
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
