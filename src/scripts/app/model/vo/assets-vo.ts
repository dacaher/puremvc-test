import {Asset} from "app/global/interfaces/asset";

export class AssetsVO {
    // TODO hace falta tenerlo separado??
    // TODO hace falta tenerlo en un diccionario??
    private gfx: { [key: string]: Asset };
    private sfx: { [key: string]: Asset };

    constructor() {
        this.gfx = {};
        this.sfx = {};
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
}
