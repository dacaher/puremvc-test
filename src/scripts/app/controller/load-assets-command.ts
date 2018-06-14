import {ProxyNames} from "app/global/constants/proxy-names";
import {AssetsProxy} from "app/model/proxy/assets-proxy";
import {INotification, SimpleCommand} from "puremvc";
import {Asset, SoundAsset} from "vendor/dacaher/pixi-assets-loader";

export class LoadAssetsCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const assetsProxy = this.facade().retrieveProxy(ProxyNames.ASSETS_PROXY) as AssetsProxy;

        const assets = require("../../../resources/assets.json"); // TODO Fix this relative url

        assetsProxy.addAssets(assets.fonts.map((current: Asset) => {
            current.type = "font";
            return current;
        }));

        assetsProxy.addAssets(assets.textures.map((current: Asset) => {
            current.type = "texture";
            return current;
        }));

        assetsProxy.addAssets(assets.animations.map((current: Asset) => {
            current.type = "animation";
            return current;
        }));

        assetsProxy.addAssets(assets.sfx.map((current: SoundAsset) => {
            current.type = "sound";
            return current;
        }));

        assetsProxy.load();
    }
}
