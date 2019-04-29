import * as Discord from 'discord.js';

export const menus = [
  {
    gameMenu: new Discord.RichEmbed()
      .setColor('#253b56')
      .setTitle('Game Menu')
      .setURL('http://www.example.com')
      .setDescription('description')
      .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
      .addField('Regular field title', 'Some value here')
      .addBlankField()
      .addField('1️⃣ Destiny 2', '--', true)
      .addField('2️⃣ Overwatch', '--', true)
      .addField('3️⃣ Apex Legends', '--', true)
      .addField('4️⃣ Anthem', '--', true)
      .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://cdn.discordapp.com/embed/avatars/0.png'),
  },
  {
    destinyMenu: new Discord.RichEmbed()
      .setColor('#346f41')
      .setTitle('Destiny Menu')
      .setURL('http://www.example.com')
      .setDescription('d2 description')
      .setThumbnail('https://alternative.me/icons2/destiny.png')
      .addField('Regular field title', 'Some value here')
      .addBlankField()
      .addField('1️⃣ Gambit', '--', true)
      .addField('2️⃣ Strikes', '--', true)
      .addField('3️⃣ Raid', '--', true)
      .addField('4️⃣ Crucible', '--', true)
      .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://cdn.discordapp.com/embed/avatars/0.png'),
  },
];