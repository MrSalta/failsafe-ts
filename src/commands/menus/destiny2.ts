import * as Discord from 'discord.js';
import { IBotMenu } from '../../api';
import * as Menus from '../../data/menus';
import * as ConfigFile from '../.././config';
import * as SQLite from 'better-sqlite3';
const sql = new SQLite('./record.sqlite');

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

    // First: Retrieve the event information from our database
    const dbEntry = args[0];
    const stmt = sql.prepare('SELECT * FROM eventLog WHERE id = ?');
    const event = stmt.get(`${args[0]}`);
    console.log(
      `Menu ${this._menu} started by ${event.user}.`
    );


    const pollMessage = await (msgObject as Discord.Message).edit(Menus.destinyMenus[0].destinyMain);

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
            const activityResult = sql.prepare('UPDATE eventLog SET activity = ?, playerCount = ? WHERE id = ?;');
            const eventActivity = activityResult.run(`${activityChoice}`, 4, `${event.id}`);
            console.log(eventActivity.changes);
            console.log(`${user.username} chose ${activityChoice}`);

            // Run Gambit Menu
            (pollMessage as Discord.Message).edit(Menus.destinyMenus[1].destinyGambit);

          }


          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
            console.log(`${msgObject.author.username} chose ${event.game}`);
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
