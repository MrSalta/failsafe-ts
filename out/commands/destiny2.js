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
const Menus = require("../data/menus");
class Destiny2 {
    constructor() {
        this._command = 'destiny2';
    }
    help() {
        return 'Destiny Menus';
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Menu ${this._command} started by ${msgObject.author.username}.`);
            yield msgObject.edit(Menus.destinyMenus[0].destinyMain);
        });
    }
}
exports.default = Destiny2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdGlueTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZGVzdGlueTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUV2QyxNQUFxQixRQUFRO0lBQTdCO1FBQ21CLGFBQVEsR0FBRyxVQUFVLENBQUM7SUFnQnpDLENBQUM7SUFkQyxJQUFJO1FBQ0YsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDakYsT0FBTyxDQUFDLEdBQUcsQ0FDVCxRQUFRLElBQUksQ0FBQyxRQUFRLGVBQWUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FDakUsQ0FBQztZQUNGLE1BQU8sU0FBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRSxDQUFDO0tBQUE7Q0FDRjtBQWpCRCwyQkFpQkMifQ==