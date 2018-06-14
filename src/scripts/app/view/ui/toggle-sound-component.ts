import {BaseComponent} from "app/view/ui/base-component";

export class ToggleSoundComponent extends BaseComponent {

    public static readonly PLAY_CLICK = "ToggleSoundComponent.PLAY_CLICK";
    public static readonly STOP_CLICK = "ToggleSoundComponent.STOP_CLICK";

    private playButton: PIXI.Sprite;
    private stopButton: PIXI.Sprite;
    private textField: PIXI.extras.BitmapText;

    private bitmapTextStyle: PIXI.extras.BitmapTextStyle = {font: "35px Desyrel", align: "center"};

    constructor(ticker: PIXI.ticker.Ticker) {
        super(ticker);
    }

    public init(): void {
        this.createPlayButton();
        this.createStopButton();
        this.createText();
    }

    public enablePlayButton(): void {
        this.playButton.interactive = true;
        this.textField.text = "Click to play music!";
    }

    public showPlayButton(): void {
        this.playButton.visible = true;
        this.stopButton.visible = false;
    }

    private createPlayButton(): void {
        this.playButton = new PIXI.Sprite(PIXI.loader.resources.play.texture);
        this.playButton.scale.set(0.75, 0.75);
        this.playButton.interactive = false; // Don't make it interactive until all sounds are loaded.
        this.playButton.buttonMode = true;

        this.playButton.on("pointerup", () => {
            this.emit(ToggleSoundComponent.PLAY_CLICK);
            this.playButton.visible = false;
            this.stopButton.visible = true;
        });

        this.addChild(this.playButton);
    }

    private createStopButton(): void {
        this.stopButton = new PIXI.Sprite(PIXI.loader.resources.stop.texture);
        this.stopButton.scale.set(0.75, 0.75);
        this.stopButton.interactive = true;
        this.stopButton.buttonMode = true;
        this.stopButton.visible = false;

        this.stopButton.on("pointerup", () => {
            this.emit(ToggleSoundComponent.STOP_CLICK);
            this.stopButton.visible = false;
            this.playButton.visible = true;
        });

        this.addChild(this.stopButton);
    }

    private createText(): void {
        this.textField = new PIXI.extras.BitmapText("Loading sounds...", this.bitmapTextStyle);
        this.textField.position.set(this.playButton.width + 10, this.playButton.height / 2 - this.textField.height / 2);

        this.addChild(this.textField);
    }
}
