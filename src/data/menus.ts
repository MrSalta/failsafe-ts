import * as Discord from 'discord.js';
import * as Icons from '../data/icons';

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
];

export const destinyMenus = [
  {
    destinyMain: new Discord.RichEmbed()
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
  {
    destinyGambit: new Discord.RichEmbed()
      .setColor('#2b856c')
      .setTitle('Destiny Gambit')
      .setURL('http://www.example.com')
      .setDescription('Gambit')
      .setThumbnail('https://www.bungie.net/common/destiny2_content/icons/fc31e8ede7cc15908d6e2dfac25d78ff.png')
      .addField('Regular field title', 'Some value here')
      .addBlankField()
      .addField('1️⃣ Gambit', '--', true)
      .addField('2️⃣ Gambit Prime', '--', true)
      .addField('3️⃣ The Reckoning', '--', true)
      .setImage(Icons.icons.Gambit)
      .setTimestamp()
      .setFooter('Some footer text here', 'https://cdn.discordapp.com/embed/avatars/0.png'),
  },
  {
    destinyRaids: new Discord.RichEmbed()
      .setColor('#346f41')
      .setTitle('Destiny Raids')
      .setURL('http://www.example.com')
      .setDescription('d2 raids')
      .setThumbnail('https://alternative.me/icons2/destiny.png')
      .addField('Regular field title', 'Some value here')
      .addBlankField()
      .addField('1️⃣ Leviathan', '--', true)
      .addField('2️⃣ Eater of Worlds', '--', true)
      .addField('3️⃣ Spire of Stars', '--', true)
      .addField('4️⃣ The Last Wish', '--', true)
      .addField('5️⃣ Scourge of the Past', '--', true)
      .setImage(Icons.icons.Raid)
      .setTimestamp()
      .setFooter('Some footer text here', 'https://cdn.discordapp.com/embed/avatars/0.png'),
  },
  {
    destinyRaids: new Discord.RichEmbed()
      .setColor('#346f41')
      .setTitle('Destiny Raids')
      .setURL('http://www.example.com')
      .setDescription('d2 raids')
      .setThumbnail('https://alternative.me/icons2/destiny.png')
      .addField('Regular field title', 'Some value here')
      .addBlankField()
      .addField('1️⃣ Leviathan', '--', true)
      .addField('2️⃣ Eater of Worlds', '--', true)
      .addField('3️⃣ Spire of Stars', '--', true)
      .addField('4️⃣ The Last Wish', '--', true)
      .setImage(Icons.icons.Raid)
      .setTimestamp()
      .setFooter('Some footer text here', 'https://cdn.discordapp.com/embed/avatars/0.png'),
  },
];