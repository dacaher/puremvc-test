import {MediatorNames} from "app/global/constants/mediator-names";
import {SampleMvcApp} from "app/sample-mvc-app";
import {MainMediator} from "app/view/mediator/main-mediator";
import {MainComponent} from "app/view/ui/main-component";
import {INotification, SimpleCommand} from "puremvc";

export class PrepViewCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        window.console.log("PrepViewCommand executed!");

        const app: SampleMvcApp = notification.getBody() as SampleMvcApp;

        // create and add main view component
        const mainComponent = new MainComponent(app.ticker);
        app.stage.addChild(mainComponent);

        // register main mediator, it will create rest of view & mediators
        const mainMediator = new MainMediator(MediatorNames.MAIN_MEDIATOR, mainComponent);
        this.facade().registerMediator(mainMediator);
    }
}
