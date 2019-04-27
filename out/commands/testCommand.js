"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestCommand {
    constructor() {
        this._command = 'testCommand';
    }
    help() {
        return 'This is just here for funzies.';
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        // Just testing
        msgObject.channel.send('It worked!');
    }
}
exports.default = TestCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdGVzdENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFxQixXQUFXO0lBQWhDO1FBRXFCLGFBQVEsR0FBRyxhQUFhLENBQUE7SUFjN0MsQ0FBQztJQWJHLElBQUk7UUFDQSxPQUFPLGdDQUFnQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7UUFFekUsZUFBZTtRQUNmLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDSjtBQWhCRCw4QkFnQkMifQ==