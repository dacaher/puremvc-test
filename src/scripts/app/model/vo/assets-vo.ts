import {Asset} from "app/model/interfaces/asset";

export class AssetsVO {
    // TODO hace falta tenerlo separado??
    private textures: { [key: string]: Asset };
    private sounds: { [key: string]: Asset };

    constructor() {
        this.textures = {};
        this.sounds = {};
    }

    public addAsset(asset: Asset): void {
        switch (asset.type) {
            case "texture":
                this.textures[asset.id] = asset;
                break;

            case "sound":
                this.sounds[asset.id] = asset;
                break;

            default:
                throw new Error("Error adding asset " + asset.id);
        }
    }

    public getTextureAssets(): Asset[] {
        const assets: Asset[] = [];

        for (const key in this.textures) {
            if (this.textures[key]) {
                assets.push(this.textures[key]);
            }
        }

        return assets;
    }

    public getTextureAsset(id: string): Asset {
        return this.textures[id];
    }

    public getSoundAssets(): Asset[] {
        const assets: Asset[] = [];

        for (const key in this.sounds) {
            if (this.sounds[key]) {
                assets.push(this.sounds[key]);
            }
        }

        return assets;
    }

    public getSoundAsset(id: string): Asset {
        return this.sounds[id];
    }
}
