import {NotificationNames} from "app/constants/notification-names";
import {HandleErrorCommand} from "app/controller/handle-error-command";
import {StartupCommand} from "app/controller/startup-command";
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
     * @override
     *
     * The <code>Model</code> <code>View</code> and <code>Controller</code> are initialized in a
     * deliberate order to ensure internal dependencies are satisfied before operations are
     * performed.
     *
     * <code>initializeController()</code> should be overridden for the specific purpose of
     * registering your commands. Any attempt to register <code>Mediator</code>s here will
     * result in an error being thrown because the View has not yet been initialized calling
     * <code>this.parent()</code> is also required.
     */
    public initializeController(): void {
        super.initializeController();

        this.registerCommand(NotificationNames.STARTUP, StartupCommand);
        this.registerCommand(NotificationNames.ERROR, HandleErrorCommand);
    }
}
