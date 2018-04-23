import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {SoundsProxy} from "app/model/proxy/sounds-proxy";
import {INotification, SimpleCommand} from "puremvc";

export class InitSoundsCommand extends SimpleCommand {

    public execute(notification: INotification): void {
        const soundProxy = this.facade().retrieveProxy(ProxyNames.SOUND_PROXY) as SoundsProxy;
        soundProxy.addSounds(notification.getBody());

        this.sendNotification(NotificationNames.SOUNDS_READY);
    }
}
