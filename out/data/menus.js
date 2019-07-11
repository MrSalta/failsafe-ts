"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const Icons = require("../data/icons");
exports.menus = [
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
exports.destinyMenus = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9tZW51cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFMUIsUUFBQSxLQUFLLEdBQUc7SUFDbkI7UUFDRSxRQUFRLEVBQUUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQzlCLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsUUFBUSxDQUFDLFdBQVcsQ0FBQzthQUNyQixNQUFNLENBQUMsd0JBQXdCLENBQUM7YUFDaEMsY0FBYyxDQUFDLGFBQWEsQ0FBQzthQUM3QixZQUFZLENBQUMsZ0RBQWdELENBQUM7YUFDOUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDO2FBQ2xELGFBQWEsRUFBRTthQUNmLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNyQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDeEMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ2xDLFFBQVEsQ0FBQyxnREFBZ0QsQ0FBQzthQUMxRCxZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZ0RBQWdELENBQUM7S0FDeEY7Q0FDRixDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQUc7SUFDMUI7UUFDRSxXQUFXLEVBQUUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQ2pDLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsUUFBUSxDQUFDLGNBQWMsQ0FBQzthQUN4QixNQUFNLENBQUMsd0JBQXdCLENBQUM7YUFDaEMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO2FBQ2hDLFlBQVksQ0FBQywyQ0FBMkMsQ0FBQzthQUN6RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUM7YUFDbEQsYUFBYSxFQUFFO2FBQ2YsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ2xDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNuQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDaEMsUUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3BDLFFBQVEsQ0FBQyxnREFBZ0QsQ0FBQzthQUMxRCxZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZ0RBQWdELENBQUM7S0FDeEY7SUFDRDtRQUNFLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDbkMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixRQUFRLENBQUMsZ0JBQWdCLENBQUM7YUFDMUIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2FBQ2hDLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDeEIsWUFBWSxDQUFDLDJGQUEyRixDQUFDO2FBQ3pHLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQzthQUNsRCxhQUFhLEVBQUU7YUFDZixRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDbEMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDeEMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDekMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQzVCLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxnREFBZ0QsQ0FBQztLQUN4RjtJQUNEO1FBQ0UsWUFBWSxFQUFFLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUNsQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxlQUFlLENBQUM7YUFDekIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2FBQ2hDLGNBQWMsQ0FBQyxVQUFVLENBQUM7YUFDMUIsWUFBWSxDQUFDLDJDQUEyQyxDQUFDO2FBQ3pELFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQzthQUNsRCxhQUFhLEVBQUU7YUFDZixRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDckMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDM0MsUUFBUSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDMUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDekMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDL0MsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzFCLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxnREFBZ0QsQ0FBQztLQUN4RjtJQUNEO1FBQ0UsWUFBWSxFQUFFLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUNsQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxlQUFlLENBQUM7YUFDekIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2FBQ2hDLGNBQWMsQ0FBQyxVQUFVLENBQUM7YUFDMUIsWUFBWSxDQUFDLDJDQUEyQyxDQUFDO2FBQ3pELFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQzthQUNsRCxhQUFhLEVBQUU7YUFDZixRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDckMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDM0MsUUFBUSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDMUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDekMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzFCLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxnREFBZ0QsQ0FBQztLQUN4RjtDQUNGLENBQUMifQ==