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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZGF0YS9tZW51cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFMUIsUUFBQSxLQUFLLEdBQUc7SUFDbkI7UUFDRSxRQUFRLEVBQUUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQzlCLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsUUFBUSxDQUFDLFdBQVcsQ0FBQzthQUNyQixNQUFNLENBQUMsd0JBQXdCLENBQUM7YUFDaEMsY0FBYyxDQUFDLGFBQWEsQ0FBQzthQUM3QixZQUFZLENBQUMsZ0RBQWdELENBQUM7YUFDOUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDO2FBQ2xELGFBQWEsRUFBRTthQUNmLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNyQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDeEMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ2xDLFFBQVEsQ0FBQyxnREFBZ0QsQ0FBQzthQUMxRCxZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZ0RBQWdELENBQUM7S0FDeEY7Q0FDRixDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQUc7SUFDMUI7UUFDRSxXQUFXLEVBQUUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQ2pDLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsUUFBUSxDQUFDLGNBQWMsQ0FBQzthQUN4QixNQUFNLENBQUMsd0JBQXdCLENBQUM7YUFDaEMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO2FBQ2hDLFlBQVksQ0FBQywyQ0FBMkMsQ0FBQzthQUN6RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUM7YUFDbEQsYUFBYSxFQUFFO2FBQ2YsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ2xDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNuQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDaEMsUUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3BDLFFBQVEsQ0FBQyxnREFBZ0QsQ0FBQzthQUMxRCxZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZ0RBQWdELENBQUM7S0FDeEY7SUFDRDtRQUNFLFlBQVksRUFBRSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDbEMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixRQUFRLENBQUMsZUFBZSxDQUFDO2FBQ3pCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQzthQUNoQyxjQUFjLENBQUMsVUFBVSxDQUFDO2FBQzFCLFlBQVksQ0FBQywyQ0FBMkMsQ0FBQzthQUN6RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUM7YUFDbEQsYUFBYSxFQUFFO2FBQ2YsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3JDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQzNDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQzFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3pDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUMxQixZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZ0RBQWdELENBQUM7S0FDeEY7Q0FDRixDQUFDIn0=