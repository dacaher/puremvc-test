import {ProxyNames} from "app/global/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {INotification, SimpleCommand} from "puremvc";

export class ResizeCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;

        if (notification.getBody().stage.orientation.changed) {
            const tempW = appProxy.getAppWidth();
            appProxy.setAppWidth(appProxy.getAppHeight());
            appProxy.setAppHeight(tempW);
        }
    }
}
