import * as Discord from 'discord.js';
import * as ConfigFile from './config';
import { IBotCommand, IBotContext } from './api';
require('dotenv').config();
import * as SQLite from 'better-sqlite3';
const sql = new SQLite('./record.sqlite');

const BOT_TOKEN = process.env.BOT_TOKEN;

const client: Discord.Client = new Discord.Client();

const commands: IBotCommand[] = [];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function handleCommand(msg: Discord.Message) {

  // Split string into the args
  const command = msg.content.split(' ')[0].replace(ConfigFile.config.prefix, '').toLowerCase();
  const string = msg.content.split(' ').slice(1);
  const args = string.slice(0, string.length).join(' ');

  for (const commandClass of commands) {

    // Attempt to execute, but ready for it not to go well or younkow
    try {

      // Check if our command class is the right one
      if (!commandClass.isThisCommand(command)) {

        // Keep looping if no
        continue;
      }

      // Run command
      await commandClass.runCommand(args, msg, client);

    }
    catch (exception) {

      // IfError, log it
      console.log(exception);
    }
  }
}
async function imageContext(msg: Discord.Message) {

  // Split string into the args
  const command = 'eduContext';
  const args = msg.attachments.first().url;

  for (const commandClass of commands) {

    // Attempt to execute, but ready for it not to go well or younkow
    try {

      // Check if our command class is the right one
      if (!commandClass.isThisCommand(command)) {

        // Keep looping if no
        continue;
      }

      // Run command
      await commandClass.runCommand(args, msg, client);

    }
    catch (exception) {

      // IfError, log it
      console.log(exception);
    }
  }
}

async function tweetContext(msg: Discord.Message) {

  // Split string into the args
  const command = 'tweetContext';
  const args: object = msg.embeds[0];

  for (const commandClass of commands) {

    // Attempt to execute, but ready for it not to go well or younkow
    try {

      // Check if our command class is the right one
      if (!commandClass.isThisCommand(command)) {

        // Keep looping if no
        continue;
      }

      // Run command
      await commandClass.runCommand(args, msg, client);

    }
    catch (exception) {

      // IfError, log it
      console.log(exception);
    }
  }
}
function loadCommands(commandsPath: string) {

  // Stop if no commands
  if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

  // Loop through to find command in config file
  for (const commandName of ConfigFile.config.commands as string[]) {

    const commandsClass = require(`${commandsPath}/${commandName}`).default;

    const command = new commandsClass() as IBotCommand;

    commands.push(command);
  }
}

loadCommands(`${__dirname}/commands`);

client.on('ready', () => {

  // Online Message
  console.log('Ready to go!');

  // Initialize Menu Storage
  const table = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'eventLog\';').get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare('CREATE TABLE eventLog (id TEXT PRIMARY KEY, title TEXT, channel TEXT, user TEXT, game TEXT, activity TEXT, level TEXT, startTime TEXT, playerCount INTEGER, player1 TEXT, player2 TEXT, player3 TEXT, player4 TEXT, player5 TEXT, player6 TEXT);').run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare('CREATE UNIQUE INDEX idx_eventLogs_id ON eventLog (id);').run();
    sql.pragma('synchronous = 1');
    sql.pragma('journal_mode = wal');
  }
});

client.on('message', async msg => {

  // Not from bot
  if (msg.author.bot) { return; }

  if (msg.channel.type == 'dm') { return; }

  if (msg.attachments.size > 0) {
    if (msg.content == '') {
      await imageContext(msg);
    }
  }
  if (msg.content.includes('twitter')) {
    await delay(1000);
    if (msg.embeds.length > 0 && (msg.content.split(' ')).length <= 2) {
      await tweetContext(msg);
    }
  }
  // Also look for prefix
  if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

  // Handle the command
  handleCommand(msg);
});

client.login(BOT_TOKEN);