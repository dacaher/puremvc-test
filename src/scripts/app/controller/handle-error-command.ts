import {INotification, SimpleCommand} from "puremvc";

export class HandleErrorCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        window.console.error(notification.getBody());
    }
}
