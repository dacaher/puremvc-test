import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {BaseMediator} from "app/view/mediator/base-mediator";
import {MainComponent} from "app/view/ui/main-component";
import {INotification} from "puremvc";

export class MainMediator extends BaseMediator<MainComponent> {
    private appProxy: AppProxy;
    private texturesLoaded: boolean;

    constructor(mediatorName?: string, viewComponent?: MainComponent) {
        super(mediatorName, viewComponent);

        this.texturesLoaded = false;

        this.addListeners();
    }

    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotificationNames.ALL_TEXTURES_LOADED:
                this.texturesLoaded = true;
                this.appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;
                this.view.init(this.appProxy.getAppWidth(), this.appProxy.getAppHeight());
                break;

            case NotificationNames.RESIZE_START:
//                this.view.visible = false;
//                this.view.stopEmittingParticles();
                break;

            case NotificationNames.RESIZE_END:
//                this.view.visible = true;
//                this.view.startEmittingParticles();

                if (notification.getBody().stage.orientation.changed && this.texturesLoaded) {
                    this.view.swapSize(); // TODO set size from appProxy.getAppWidth & appProxy.getAppHeight
                    this.view.relocate();
                }

                break;
        }
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationNames.ALL_TEXTURES_LOADED,
            NotificationNames.RESIZE_START,
            NotificationNames.RESIZE_END,
        ];
    }

    public onRegister(): void {
        // TODO impl
    }

    protected removeListeners(): void {
        throw new Error("Method not implemented.");
    }

    protected addListeners(): void {
        // TODO impl
    }
}
