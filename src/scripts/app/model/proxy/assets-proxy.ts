
import {NotificationNames} from "app/constants/notification-names";
import {Asset} from "app/model/interfaces/asset";
import {AssetsVO} from "app/model/vo/assets-vo";
import {Proxy} from "puremvc";

export class AssetsProxy extends Proxy {

    public getTexture(id: string): PIXI.Texture | null {
        const vo = this.data as AssetsVO;
        const asset = vo.getTextureAsset(id);

        if (asset && asset.loaded) {
            // Si tenemos el asset cargado devolvemos la textura
            return PIXI.loader.resources[id].texture;
        } else {
            this.sendNotification(NotificationNames.ERROR, `Texture ${id} not loaded`);
            return null;
        }
    }

    public addAsset(asset: Asset): void {
        (this.data as AssetsVO).addAsset(asset);
    }

    public loadTextures(): void {
        const vo = this.data as AssetsVO;

        vo.getTextureAssets().forEach(textureAsset => {
            PIXI.loader.add(textureAsset.id, textureAsset.url);
        });

        PIXI.loader.load(() => {
            vo.getTextureAssets().forEach(textureAsset => textureAsset.loaded = true);
            this.sendNotification(NotificationNames.ALL_TEXTURES_LOADED);
        });
    }
}
