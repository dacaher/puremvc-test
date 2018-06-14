import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {BaseMediator} from "app/view/mediator/base-mediator";
import {MainComponent} from "app/view/ui/main-component";
import {INotification} from "puremvc";

export class MainMediator extends BaseMediator<MainComponent> {
    private appProxy: AppProxy;

    constructor(mediatorName?: string, viewComponent?: MainComponent) {
        super(mediatorName, viewComponent);
    }

    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotificationNames.ALL_TEXTURES_LOADED:
                break;

            case NotificationNames.RESIZE_START:
                break;

            case NotificationNames.RESIZE_END:
                if (notification.getBody().stage.orientation.changed) {
                    this.view.swapSize(); // TODO set size from appProxy.getAppWidth & appProxy.getAppHeight
                    this.view.relocate();
                }

                break;

            case NotificationNames.GROUP_ASSETS_LOADED:
                this.view.createViewsByPriority(notification.getBody().priority);
                break;

            case NotificationNames.GROUP_ASSETS_PROGRESS:
                this.view.loadingText.text = `Loading... ${notification.getBody().progress.toFixed(2)}%`;
                break;
        }
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationNames.ALL_TEXTURES_LOADED,
            NotificationNames.RESIZE_START,
            NotificationNames.RESIZE_END,
            NotificationNames.GROUP_ASSETS_LOADED,
            NotificationNames.GROUP_ASSETS_PROGRESS,
        ];
    }

    public onRegister(): void {
        this.appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;

        this.view.init(this.appProxy.getAppWidth(), this.appProxy.getAppHeight());
        this.addListeners();
    }

    protected removeListeners(): void {
        throw new Error("Method not implemented.");
    }

    protected addListeners(): void {
        // TODO impl
    }
}
