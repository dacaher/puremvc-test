import {PixiAppWrapper as Wrapper} from "pixi-app-wrapper";
import {BaseComponent} from "./base-component";

export class MainComponent extends BaseComponent {
    constructor() {
        super();
    }

    public init(appWidth: number, appHeight: number) {
        this.drawScreenBorder(appWidth, appHeight);
        this.drawSquare(appWidth / 2 - 25, appHeight / 2 - 25);
    }

    private drawSquare(x = 0, y = 0, s = 50, r = 10): void {
        this.drawRoundedRectangle(x, y, s, s, r);
    }

    private drawRoundedRectangle(x = 0, y = 0, w = 50, h = 50, r = 10): void {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0xFF00BB, 0.25);
        graphics.drawRoundedRect(x, y, w, h, r);
        graphics.endFill();

        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics.on("pointerup", () => {
            // pointerdown does not trigger a user event in chrome-android
            Wrapper.toggleFulscreen(document.getElementById("app-root"));
        });

        this.addChild(graphics);
    }

    private drawScreenBorder(width: number, heigth: number, lineWidth: number = 4): void {
        const halfWidth = lineWidth / 2;

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(lineWidth, 0xFF00FF, 1);
        graphics.drawRect(halfWidth, halfWidth, width - lineWidth, heigth - lineWidth);

        this.addChild(graphics);
    }
}
