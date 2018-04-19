import {HandleErrorCommand} from "app/controller/handle-error-command";
import {StartupCommand} from "app/controller/startup-command";
import {NotificationNames} from "app/global/constants/notification-names";
import {SampleMvcApp} from "app/sample-mvc-app";
import {Facade} from "puremvc";

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
    }
}
