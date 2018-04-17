import {ProxyNames} from "app/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {AssetsProxy} from "app/model/proxy/assets-proxy";
import {AppVO} from "app/model/vo/app-vo";
import {AssetsVO} from "app/model/vo/assets-vo";
import {SampleMvcApp} from "app/sample-mvc-app";
import {INotification, SimpleCommand} from "puremvc";

export class PrepModelCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const app: SampleMvcApp = notification.getBody() as SampleMvcApp;

        // Data init
        const appProxy = new AppProxy(ProxyNames.APP_PROXY, new AppVO(app.initialWidth, app.initialHeight));
        const assetsProxy = new AssetsProxy(ProxyNames.ASSETS_PROXY, new AssetsVO());

        // Proxies init
        this.facade().registerProxy(appProxy);
        this.facade().registerProxy(assetsProxy);

        window.console.log("PrepModelCommand executed!", notification);
    }
}
