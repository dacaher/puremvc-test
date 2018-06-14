import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {SoundsProxy} from "app/model/proxy/sounds-proxy";
import {INotification, SimpleCommand} from "puremvc";
import {LoadAsset, SoundAsset} from "vendor/dacaher/pixi-assets-loader";

export class InitSoundsCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const soundProxy = this.facade().retrieveProxy(ProxyNames.SOUND_PROXY) as SoundsProxy;
        const soundObj: { [key: string]: Howl } = {};

        notification.getBody().assets.forEach((loadAsset: LoadAsset) => {
            if (loadAsset.asset.type === "sound") {
                const sound = (loadAsset.asset as SoundAsset).howl!;
                soundObj[loadAsset.asset.id] = sound;
            }
        });

        if (Object.keys(soundObj).length > 0) {
            soundProxy.addSounds(soundObj);
            this.sendNotification(NotificationNames.SOUNDS_READY);
        }
    }
}
