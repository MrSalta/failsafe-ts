"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
let imageURL;
class EduContext {
    constructor() {
        this._noContext = 'eduContext';
    }
    help() {
        // eslint-disable-next-line quotes
        return `Prompts the user (usually Edu) to provide context for the image`;
    }
    isThisCommand(command) {
        return command === this._noContext;
    }
    // eslint-disable-next-line no-shadow
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield msgObject.delete();
            const contextMaker = new Discord.RichEmbed()
                .setTitle('The Contextifier!')
                .setImage(imageURL)
                .setThumbnail(imageURL)
                .setDescription(`Hello @${msgObject.author.username}! It looks like you were posting this image without any sort of context. Please reply with some context, and I'll post your image.`);
            imageURL = args;
            // Did it work?
            console.log(imageURL);
            const sourceChannel = msgObject.channel.id;
            yield msgObject.author.send(contextMaker);
        });
    }
}
exports.default = EduContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWR1Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9lZHVDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFJdEMsSUFBSSxRQUFRLENBQUM7QUFFYixNQUFxQixVQUFVO0lBQS9CO1FBRW1CLGVBQVUsR0FBRyxZQUFZLENBQUE7SUEwQjVDLENBQUM7SUF4QkMsSUFBSTtRQUNGLGtDQUFrQztRQUNsQyxPQUFPLGlFQUFpRSxDQUFDO0lBQzNFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxxQ0FBcUM7SUFDL0IsVUFBVSxDQUFDLElBQVksRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxNQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QixNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ3pDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDN0IsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsWUFBWSxDQUFDLFFBQVEsQ0FBQztpQkFDdEIsY0FBYyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLG9JQUFvSSxDQUFDLENBQUM7WUFFM0wsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixlQUFlO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUMzQyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtDQUNGO0FBNUJELDZCQTRCQyJ9