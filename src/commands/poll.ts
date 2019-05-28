import * as Discord from 'discord.js';
import { IBotMenu } from '../api';
import * as ConfigFile from '../config';
import * as Menus from '../data/menus';
import * as SQLite from 'better-sqlite3';
import { userInfo } from 'os';
const sql = new SQLite('./record.sqlite');

// Load client and declare variable
const client: Discord.Client = this.Client;
let gameChoice = undefined;
let event = undefined;
let eventTime = undefined;

const menus: IBotMenu[] = [];

// Function to load the menus
// @menusPath: /path/to/commandFolder
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

// Function to run the menu when chosen
// Params from Discord
async function handleMenu(msg: Discord.Message, user: Discord.User) {

  // Search for and call next menu choice
  const menu = `${gameChoice}`.toLowerCase();

  // Save the event ID as argument to pass to next module
  const args = [`${event.id}`];

  for (const menuClass of menus) {

    try {

      // Check if our command class is the right one
      if (!menuClass.isThisCommand(menu)) {
        continue;
      }

      // Run command
      // @args: event ID from database
      // @msg: message object
      // @client: Discord Client
      // @user: the original discord user
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async runCommand(args: string[], msgObject: Discord.Message, _client: Discord.Client): Promise<void> {
    await msgObject.delete(0);

    const eventTitle = args;
    await msgObject.channel.send('What time would you like this to start?').then(async () => {
      await msgObject.channel.awaitMessages(response => response.content, { maxMatches: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          eventTime = collected.first().content;
          console.log(`Time is ${eventTime}. Title is ${eventTitle}`);
        }
        )
        .catch(collected => console.log('Error')
        );
    });

    // Get current time for ID purposes
    const theTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create event in database
    event = { id: `${msgObject.author.id}-${theTime}`, user: msgObject.author.username, title: `${eventTitle}`, startTime: `${eventTime}` };
    const newEvent = sql.prepare('INSERT OR REPLACE INTO eventLog (id, user, title, startTime) VALUES (?, ?, ?, ?);');
    const info = newEvent.run(`${event.id}`, `${event.user}`, `${event.title}`, `${eventTime}`);
    console.log(
      `Command ${this._menu} created id ${event.id} and was started by ${msgObject.author.username}.`);
    console.log(info.changes);

    // Send first menu
    const pollEmbed = Menus.menus[0].gameMenu;

    const pollMessage = await msgObject.channel.send(pollEmbed);

    // Add reactions to serve as menu choices
    // Reactions from config file so I don't have to remember the unicode
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

    // Filter to ignore reactions not part of the menu, and to ensure the bot doesn't try to answer itself
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

    // Menu is created - now we're waiting user's choice
    await (pollMessage as Discord.Message)
      .awaitReactions(filter, { max: 1, time: 60000 })
      .then(async collected => {
        const reaction = collected.first();

        try {
          // User choses Destiny 2
          if (reaction.emoji.name === ConfigFile.config.reactionNumbers[1]) {
            reaction.remove(
              reaction.users.filter(u => u === msgObject.author).first()
            );

            // Log and add choice to database
            gameChoice = 'Destiny2';
            console.log(`${msgObject.author.username} chose ${gameChoice}`);
            const gameResult = sql.prepare('UPDATE eventLog SET game = ? WHERE id = ?;');
            const eventGame = gameResult.run(`${gameChoice}`, `${event.id}`);
            console.log(eventGame.changes);

            // Run Destiny2 Menu Module
            handleMenu(pollMessage as Discord.Message, msgObject.author);
          }

          // User chooses Overwatch
          // TODO: Build Overwatch Menu - Code below is incomplete
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
          // If the user doesn't choose anything after the time limit, delete menu
          msgObject.channel.send('No selection in time!');
          console.log('After a minute, no answers');
          (pollMessage as Discord.Message).delete(0);
        }
      });
  }
}
