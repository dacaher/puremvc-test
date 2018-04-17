import {NotificationNames} from "app/constants/notification-names";
import {ProxyNames} from "app/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {MainComponent} from "app/view/ui/main-component";
import {INotification, Mediator} from "puremvc";

export class MainMediator extends Mediator {
    constructor(mediatorName?: string, viewComponent?: MainComponent) {
        super(mediatorName, viewComponent);

        this.addListeners();
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationNames.ALL_TEXTURES_LOADED,
        ];
    }

    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotificationNames.ALL_TEXTURES_LOADED:
                const appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;
                this.view.init(appProxy.getAppWidth(), appProxy.getAppHeight());
                break;
        }
    }

    public onRegister(): void {
        // TODO impl
    }

    public onRemove(): void {
        this.removeListeners();
        this.view.destroy(); // TODO destroy viewComp ???
    }

    public get view(): MainComponent {
        return this.viewComponent as MainComponent; // TODO no se si funcionara al sobrescribir el metodo getViewComponent
    }

    private addListeners(): void {
        // TODO impl
    }

    private removeListeners(): void {
        // TODO impl
    }
}
