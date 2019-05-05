import * as Discord from 'discord.js';
import { IBotMenu } from '../api';
import * as ConfigFile from '../config';
import * as Menus from '../data/menus';

// Load client and declare variable
const client: Discord.Client = this.Client;
let gameChoice = undefined;
const menus: IBotMenu[] = [];
function loadMenus(menusPath: string) {
  // Stop if no commands
  if (
    !ConfigFile.config ||
    (ConfigFile.config.menus as string[]).length === 0
  ) {
    return;
  }

  // Loop through to find command in config file
  for (const menuName of ConfigFile.config.menus as string[]) {
    const menuClass = require(`${menusPath}/${menuName}`).default;

    const menu = new menuClass() as IBotMenu;

    menus.push(menu);
  }
}
async function handleMenu(msg: Discord.Message, user: Discord.User) {

  // Split string into the args
  const menu = `${gameChoice}`.toLowerCase();
  const args = [`${gameChoice}`];
  for (const menuClass of menus) {

    // Attempt to execute, but ready for it not to go well or younkow
    try {

      // Check if our command class is the right one
      if (!menuClass.isThisCommand(menu)) {

        // Keep looping if no
        continue;
      }

      // Run command
      await menuClass.runCommand(args, msg, client, user);

    }
    catch (exception) {

      // IfError, log it
      console.log(exception);
    }
  }
}

loadMenus(`${__dirname}/menus`);

export default class Poll implements IBotMenu {
  private readonly _menu = 'poll';

  help(): string {
    // eslint-disable-next-line quotes
    return `Basic poll thingy`;
  }

  isThisCommand(command: string): boolean {
    return command === this._menu;
  }

  async runCommand(args: string[], msgObject: Discord.Message, _client: Discord.Client): Promise<void> {
    await msgObject.delete(0);
    console.log(
      `Command ${this._menu} started by ${msgObject.author.username}.`);

    if (args.length < 1) { return; }

    const pollDesc = args.join(' ');

    const pollEmbed = Menus.menus[0].gameMenu;

    const pollMessage = await msgObject.channel.send(pollEmbed);

    await (pollMessage as Discord.Message).react(
      ConfigFile.config.reactionNumbers[1]
    );
    await (pollMessage as Discord.Message).react(
      ConfigFile.config.reactionNumbers[2]
    );
    await (pollMessage as Discord.Message).react(
      ConfigFile.config.reactionNumbers[3]
    );
    await (pollMessage as Discord.Message).react(
      ConfigFile.config.reactionNumbers[4]
    );

    const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
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
        ].includes(reaction.emoji.name) && user.id === msgObject.author.id
      );
    };

    await (pollMessage as Discord.Message)
      .awaitReactions(filter, { max: 1, time: 60000 })
      .then(collected => {
        const reaction = collected.first();

        try {
          // Destiny 2
          // Game Menu
          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
            reaction.remove(
              reaction.users.filter(u => u === msgObject.author).first()
            );
            gameChoice = 'Destiny2';
            console.log(`${msgObject.author.username} chose ${gameChoice}`);

            // Run Destiny2 Menu Module
            handleMenu(pollMessage as Discord.Message, msgObject.author);

          }


          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[2]) {
            gameChoice = 'Overwatch';
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
