import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {BaseMediator} from "app/view/mediator/base-mediator";
import {MainComponent} from "app/view/ui/main-component";
import {INotification} from "puremvc";

export class MainMediator extends BaseMediator<MainComponent> {

    constructor(mediatorName?: string, viewComponent?: MainComponent) {
        super(mediatorName, viewComponent);

        this.addListeners();
    }

    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotificationNames.ALL_TEXTURES_LOADED:
                const appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;
                this.view.init(appProxy.getAppWidth(), appProxy.getAppHeight());
                break;
        }
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationNames.ALL_TEXTURES_LOADED,
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
