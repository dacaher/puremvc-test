import {ProxyNames} from "app/global/constants/proxy-names";
import {AssetsProxy} from "app/model/proxy/assets-proxy";
import {INotification, SimpleCommand} from "puremvc";

export class LoadAssetsCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const assetsProxy = this.facade().retrieveProxy(ProxyNames.ASSETS_PROXY) as AssetsProxy;

        const assets = require("../../../resources/assets.json"); // TODO FIX THIS

        assetsProxy.addAssets(assets.textures.map((current: any) => {
            current.type = "texture";
            current.loaded = false;
            return current;
        }));
        assetsProxy.loadTextures();
    }
}
