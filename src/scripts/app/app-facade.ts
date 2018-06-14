import {HandleErrorCommand} from "app/controller/handle-error-command";
import {InitSoundsCommand} from "app/controller/init-sounds-command";
import {PlaySoundCommand} from "app/controller/play-sound-command";
import {StartupCommand} from "app/controller/startup-command";
import {StopSoundCommand} from "app/controller/stop-sound-command";
import {NotificationNames} from "app/global/constants/notification-names";
import {SampleMvcApp} from "app/sample-mvc-app";
import {Facade} from "puremvc";
import {ResizeCommand} from "app/controller/resize-command";

export class AppFacade extends Facade {

    public static getInstance(key: string): AppFacade {
        if (!Facade.instanceMap[key]) {
            Facade.instanceMap[key] = new AppFacade();
        }

        return Facade.instanceMap[key] as AppFacade;
    }

    constructor() {
        super(SampleMvcApp.MODULE_NAME);
    }

    /**
     * Start the application.
     *
     * @param app
     * The HTML root node element of the application.
     */
    public startup(app: SampleMvcApp) {
        this.sendNotification(NotificationNames.STARTUP, app);
    }

    /**
     * @inheritDoc
     */
    public initializeController(): void {
        super.initializeController();

        this.registerCommand(NotificationNames.STARTUP, StartupCommand);
        this.registerCommand(NotificationNames.ERROR, HandleErrorCommand);
        this.registerCommand(NotificationNames.GROUP_ASSETS_LOADED, InitSoundsCommand);
        this.registerCommand(NotificationNames.PLAY_SOUND, PlaySoundCommand);
        this.registerCommand(NotificationNames.STOP_SOUND, StopSoundCommand);
        this.registerCommand(NotificationNames.RESIZE_END, ResizeCommand);
    }
}
