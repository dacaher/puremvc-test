export class BaseComponent extends PIXI.Container {
    private readonly _ticker: PIXI.ticker.Ticker;

    constructor(ticker: PIXI.ticker.Ticker) {
        super();
        this._ticker = ticker;
    }

    protected get ticker(): PIXI.ticker.Ticker {
        return this._ticker;
    }
}
