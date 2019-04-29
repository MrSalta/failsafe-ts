"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZGF0YS9tZW51cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUV6QixRQUFBLEtBQUssR0FBRztJQUNuQjtRQUNFLFFBQVEsRUFBRSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDOUIsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixRQUFRLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQzthQUNoQyxjQUFjLENBQUMsYUFBYSxDQUFDO2FBQzdCLFlBQVksQ0FBQyxnREFBZ0QsQ0FBQzthQUM5RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUM7YUFDbEQsYUFBYSxFQUFFO2FBQ2YsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3JDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNyQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUN4QyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDbEMsUUFBUSxDQUFDLGdEQUFnRCxDQUFDO2FBQzFELFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxnREFBZ0QsQ0FBQztLQUN4RjtJQUNEO1FBQ0UsV0FBVyxFQUFFLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUNqQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxjQUFjLENBQUM7YUFDeEIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2FBQ2hDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNoQyxZQUFZLENBQUMsMkNBQTJDLENBQUM7YUFDekQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDO2FBQ2xELGFBQWEsRUFBRTthQUNmLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNsQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFDbkMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ2hDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNwQyxRQUFRLENBQUMsZ0RBQWdELENBQUM7YUFDMUQsWUFBWSxFQUFFO2FBQ2QsU0FBUyxDQUFDLHVCQUF1QixFQUFFLGdEQUFnRCxDQUFDO0tBQ3hGO0NBQ0YsQ0FBQyJ9