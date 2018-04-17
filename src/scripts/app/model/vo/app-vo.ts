export class AppVO {
    public playingMusic = false;
    public texts = {
        bunnies: "Click us!",
        fullscreen: "Click on the square to toggle fullscreen!",
        music: "Click to play music!",
    };

    private _appWidth: number;
    private _appHeight: number;

    constructor(appWidth: number, appHeight: number) {
        this._appWidth = appWidth;
        this._appHeight = appHeight;
    }

    public get appHeight(): number {
        return this._appHeight;
    }

    public get appWidth(): number {
        return this._appWidth;
    }
}
