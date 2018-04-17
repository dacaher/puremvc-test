import {NotificationNames} from "app/constants/notification-names";
import {Asset} from "app/model/interfaces/asset";
import {BaseProxy} from "app/model/proxy/base-proxy";
import {AssetsVO} from "app/model/vo/assets-vo";

export class AssetsProxy extends BaseProxy<AssetsVO> {

    public onRemove(): void {
        // TODO impl
    }

    public onRegister(): void {
        // TODO impl
    }

    public getTexture(id: string): PIXI.Texture | null {
        const asset = this.vo.getTextureAsset(id);

        if (asset && asset.loaded) {
            // Si tenemos el asset cargado devolvemos la textura
            return PIXI.loader.resources[id].texture;
        } else {
            this.sendNotification(NotificationNames.ERROR, `Texture ${id} not loaded`);
            return null;
        }
    }

    public addAsset(asset: Asset): void {
        this.vo.addAsset(asset);
    }

    public loadTextures(): void {
        this.vo.getTextureAssets().forEach(textureAsset => {
            PIXI.loader.add(textureAsset.id, textureAsset.url);
        });

        PIXI.loader.load(() => {
            this.vo.getTextureAssets().forEach(textureAsset => textureAsset.loaded = true);
            this.sendNotification(NotificationNames.ALL_TEXTURES_LOADED);
        });
    }
}
