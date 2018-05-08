import {AppFacade} from "app/app-facade";
import {NotificationNames} from "app/global/constants/notification-names";
import {Dom, PixiAppWrapper as PixiApp, pixiAppWrapperEvent as WrapperEvent} from "pixi-app-wrapper";

export class SampleMvcApp extends PixiApp {
    public static readonly MODULE_NAME = "SampleMvcApp";

    private _scale: number;

    private facade: AppFacade;

    constructor(width = 800, height = 600, scale = 1) {
        super({
            width,
            height,
            scale: "keep-aspect-ratio",
            align: "middle",
            resolution: window.devicePixelRatio,
            roundPixels: true,
            transparent: false,
            backgroundColor: 0x000000,
            view: Dom.getElementOrCreateNew<HTMLCanvasElement>("app-canvas", "canvas", document.getElementById("app-root")),
            showFPS: true,
            showMediaInfo: true,
        });

        this._scale = scale;

        this.facade = AppFacade.getInstance(SampleMvcApp.MODULE_NAME) as AppFacade;

        // Startup the app
        this.facade.startup(this);

        // Add Listeners
        this.on(WrapperEvent.RESIZE_START, () => this.facade.sendNotification(NotificationNames.RESIZE_START));
        this.on(WrapperEvent.RESIZE_END, args => this.facade.sendNotification(NotificationNames.RESIZE_END, args));
    }
}
