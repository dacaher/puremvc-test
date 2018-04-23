import {ProxyNames} from "app/global/constants/proxy-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {AssetsProxy} from "app/model/proxy/assets-proxy";
import {SoundsProxy} from "app/model/proxy/sounds-proxy";
import {AppVO} from "app/model/vo/app-vo";
import {AssetsVO} from "app/model/vo/assets-vo";
import {SoundsVO} from "app/model/vo/sounds-vo";
import {SampleMvcApp} from "app/sample-mvc-app";
import {INotification, SimpleCommand} from "puremvc";

export class PrepModelCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        window.console.log("PrepModelCommand executed!");

        const app: SampleMvcApp = notification.getBody() as SampleMvcApp;

        // Data init
        const appProxy = new AppProxy(ProxyNames.APP_PROXY, new AppVO(app.initialWidth, app.initialHeight));
        const assetsProxy = new AssetsProxy(ProxyNames.ASSETS_PROXY, new AssetsVO());
        const soundProxy = new SoundsProxy(ProxyNames.SOUND_PROXY, new SoundsVO());

        // Proxies init
        this.facade().registerProxy(appProxy);
        this.facade().registerProxy(assetsProxy);
        this.facade().registerProxy(soundProxy);
    }
}
