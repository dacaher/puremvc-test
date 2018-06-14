import {NotificationNames} from "app/global/constants/notification-names";
import {ProxyNames} from "app/global/constants/proxy-names";
import {SoundNames} from "app/global/constants/sound-names";
import {AppProxy} from "app/model/proxy/app-proxy";
import {BaseMediator} from "app/view/mediator/base-mediator";
import {ToggleSoundComponent} from "app/view/ui/toggle-sound-component";
import {INotification} from "puremvc";
import {AssetPriority} from "vendor/dacaher/pixi-assets-loader";

export class ToggleSoundMediator extends BaseMediator<ToggleSoundComponent> {

    constructor(mediatorName?: string, viewComponent?: ToggleSoundComponent) {
        super(mediatorName, viewComponent);

        this.addListeners();
    }

    /**
     * @inheritdoc
     */
    public onRegister(): void {
        // Nothing to do here
    }

    /**
     * @inheritdoc
     */
    public listNotificationInterests(): string[] {
        return [
            NotificationNames.ALL_TEXTURES_LOADED,
            NotificationNames.SOUNDS_READY,
            NotificationNames.SOUND_PLAY_ENDED,
            NotificationNames.RESIZE_END,
            NotificationNames.GROUP_ASSETS_LOADED,
        ];
    }

    /**
     * @inheritdoc
     */
    public handleNotification(notification: INotification): void {
        let appProxy: AppProxy;

        switch (notification.getName()) {
            case NotificationNames.GROUP_ASSETS_LOADED:

                if (notification.getBody().priority === AssetPriority.NORMAL) {
                    appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;
                    // TODO review initialization of views!!
                    this.view.init();
                    this.view.position.set(appProxy.getAppWidth() / 2 - this.view.width / 2, appProxy.getAppHeight() * 0.1);
                }

                break;

            case NotificationNames.SOUNDS_READY:
                this.view.enablePlayButton();
                break;

            case NotificationNames.SOUND_PLAY_ENDED:
                this.view.showPlayButton(); // Sound ended, show play button again!
                break;

            case NotificationNames.RESIZE_END:
                appProxy = this.facade().retrieveProxy(ProxyNames.APP_PROXY) as AppProxy;
                this.view.position.set(appProxy.getAppWidth() / 2 - this.view.width / 2, appProxy.getAppHeight() * 0.1);
                break;
        }
    }

    /**
     * @inheritdoc
     */
    protected addListeners(): void {
        this.view.on(ToggleSoundComponent.PLAY_CLICK, this.onPlayClick.bind(this));
        this.view.on(ToggleSoundComponent.STOP_CLICK, this.onStopClick.bind(this));
    }

    /**
     * @inheritdoc
     */
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
