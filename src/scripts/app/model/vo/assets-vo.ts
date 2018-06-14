import {Asset} from "vendor/dacaher/pixi-assets-loader";

export class AssetsVO {
    // TODO hace falta tenerlo separado??
    // TODO hace falta tenerlo en un diccionario??
    private gfx: { [key: string]: Asset };
    private sfx: { [key: string]: Asset };

    private _totalAssets: number;
    private _loadingProgress: number;
    private _assetsCount: { [key: number]: { total: number, progress: number } };

    constructor() {
        this.gfx = {};
        this.sfx = {};

        this._totalAssets = 0;
        this._loadingProgress = 0;
        this._assetsCount = {};
    }

    public addAsset(asset: Asset): void {
        switch (asset.type) {
            case "texture":
                this.gfx[asset.id] = asset;
                break;

            case "sound":
                this.sfx[asset.id] = asset;
                break;

            default:
                throw new Error("Error adding asset " + asset.id);
        }
    }

    public getGfxAssets(): Asset[] {
        const assets: Asset[] = [];

        for (const key in this.gfx) {
            if (this.gfx[key]) {
                assets.push(this.gfx[key]);
            }
        }

        return assets;
    }

    public getGfxAsset(id: string): Asset {
        return this.gfx[id];
    }

    public getSfxAssets(): Asset[] {
        const assets: Asset[] = [];

        for (const key in this.sfx) {
            if (this.sfx[key]) {
                assets.push(this.sfx[key]);
            }
        }

        return assets;
    }

    public getSfxAsset(id: string): Asset {
        return this.sfx[id];
    }

    public get assetsCount(): { [p: number]: { total: number; progress: number } } {
        return this._assetsCount;
    }

    public set assetsCount(value: { [p: number]: { total: number; progress: number } }) {
        this._assetsCount = value;
    }
    public get loadingProgress(): number {
        return this._loadingProgress;
    }

    public set loadingProgress(value: number) {
        this._loadingProgress = value;
    }

    public get totalAssets(): number {
        return this._totalAssets;
    }

    public set totalAssets(value: number) {
        this._totalAssets = value;
    }
}
