import {ProxyNames} from "app/constants/proxy-names";
import {AssetsProxy} from "app/model/proxy/assets-proxy";
import {INotification, SimpleCommand} from "puremvc";

export class LoadAssetsCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const assetsProxy = this.facade().retrieveProxy(ProxyNames.ASSETS_PROXY) as AssetsProxy;
        assetsProxy.loadTextures();
    }
}
