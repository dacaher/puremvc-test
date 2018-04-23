import {ProxyNames} from "app/global/constants/proxy-names";
import {AssetsProxy} from "app/model/proxy/assets-proxy";
import {INotification, SimpleCommand} from "puremvc";

export class LoadAssetsCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const assetsProxy = this.facade().retrieveProxy(ProxyNames.ASSETS_PROXY) as AssetsProxy;

        const assets = require("../../../resources/assets.json"); // TODO Fix this

        assetsProxy.addAssets(assets.gfx.map((current: any) => {
            current.type = "texture";
            current.loaded = false;
            return current;
        }));

        assetsProxy.addAssets(assets.sfx.map((current: any) => {
            current.type = "sound";
            current.loaded = false;
            return current;
        }));

        assetsProxy.loadGfx();
        assetsProxy.loadSfx();
    }
}
