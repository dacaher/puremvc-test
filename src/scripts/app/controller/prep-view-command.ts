import {MediatorNames} from "app/global/constants/mediator-names";
import {SampleMvcApp} from "app/sample-mvc-app";
import {MainMediator} from "app/view/mediator/main-mediator";
import {ToggleSoundMediator} from "app/view/mediator/toggle-sound-mediator";
import {MainComponent} from "app/view/ui/main-component";
import {ToggleSoundComponent} from "app/view/ui/toggle-sound-component";
import {INotification, SimpleCommand} from "puremvc";

export class PrepViewCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        window.console.log("PrepViewCommand executed!");

        const app: SampleMvcApp = notification.getBody() as SampleMvcApp;

        // create and add main view component
        const mainComponent = new MainComponent(app.ticker);
        app.stage.addChild(mainComponent);

        // toggleSound comp
        const toggleSoundComponent = new ToggleSoundComponent(app.ticker);
        // toggleSoundComponent.position.set(app.initialWidth / 2 - container.width / 2, app.initialHeight * 0.1); // TODO proper place to set view position, scale, layer, etc.?
        toggleSoundComponent.position.set(app.initialWidth / 2, app.initialHeight * 0.1);

        mainComponent.addChild(toggleSoundComponent);

        // REGISTER ALL MEDIATORS
        // register main mediator, it will create rest of view & mediators... or not, we'll see :)
        const mainMediator = new MainMediator(MediatorNames.MAIN_MEDIATOR, mainComponent);
        const toggleSoundMediator = new ToggleSoundMediator(MediatorNames.TOGGLE_SOUND_MEDIATOR, toggleSoundComponent);

        this.facade().registerMediator(mainMediator);
        this.facade().registerMediator(toggleSoundMediator);
    }
}
