import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {SoundNames} from "app/global/constants/sound-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {BaseMediator} from "app/view/mediator/base-mediator";
import {ToggleSoundComponent} from "app/view/ui/toggle-sound-component";
import {INotification} from "puremvc";

export class ToggleSoundMediator extends BaseMediator<ToggleSoundComponent> {

    constructor(mediatorName?: string, viewComponent?: ToggleSoundComponent) {
        super(mediatorName, viewComponent);

        this.addListeners();
    }

    public onRegister(): void {
        // Nothing to do here
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationNames.ALL_TEXTURES_LOADED,
            NotificationNames.SOUNDS_READY,
            NotificationNames.SOUND_PLAY_ENDED,
        ];
    }

    public handleNotification(notification: INotification): void {
        switch (notification.getName()) {
            case NotificationNames.ALL_TEXTURES_LOADED:
                const appProxy: AppProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;
                // TODO review initialization of views!!
                this.view.init();
                this.view.position.set(appProxy.getAppWidth() / 2 - this.view.width / 2, appProxy.getAppHeight() * 0.1);
                break;

            case NotificationNames.SOUNDS_READY:
                this.view.enablePlayButton();
                break;

            case NotificationNames.SOUND_PLAY_ENDED:
                this.view.showPlayButton(); // Sound ended, show play button again!
                break;
        }
    }

    protected addListeners(): void {
        this.view.on(ToggleSoundComponent.PLAY_CLICK, this.onPlayClick.bind(this));
        this.view.on(ToggleSoundComponent.STOP_CLICK, this.onStopClick.bind(this));
    }

    protected removeListeners(): void {
        this.view.off(ToggleSoundComponent.PLAY_CLICK, this.onPlayClick.bind(this));
        this.view.off(ToggleSoundComponent.STOP_CLICK, this.onStopClick.bind(this));
    }

    private onPlayClick(): void {
        this.sendNotification(NotificationNames.PLAY_SOUND, SoundNames.MUSIC);
    }

    private onStopClick(): void {
        this.sendNotification(NotificationNames.STOP_SOUND, SoundNames.MUSIC);
    }
}
