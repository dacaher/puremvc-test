import {NotificationNames} from "app/global/constants/notification-names";
import {BaseProxy} from "app/model/proxy/base-proxy";
import {AssetsVO} from "app/model/vo/assets-vo";
import {Asset, LoadAsset, PixiAssetsLoader} from "vendor/dacaher/pixi-assets-loader/pixi-assets-loader";

export class AssetsProxy extends BaseProxy<AssetsVO> {

    private loader: PixiAssetsLoader;

    constructor(proxyName: string, data: any) {
        super(proxyName, data);

        this.loader = new PixiAssetsLoader();

        this.loader.on(PixiAssetsLoader.PRIORITY_GROUP_LOADED, this.onAssetsLoaded.bind(this));
        this.loader.on(PixiAssetsLoader.PRIORITY_GROUP_PROGRESS, this.onAssetsProgress.bind(this));
        this.loader.on(PixiAssetsLoader.ALL_ASSETS_LOADED, this.onAllAssetsLoaded.bind(this));
        this.loader.on(PixiAssetsLoader.ASSET_ERROR, this.onAssetsError.bind(this));
    }

    public onRemove(): void {
        // TODO impl
    }

    public onRegister(): void {
        // TODO impl
    }

    public getTexture(id: string): PIXI.Texture | null {
        const asset = this.vo.getGfxAsset(id);

        if (asset) {
            // Si tenemos el asset cargado devolvemos la textura
            return PIXI.loader.resources[id].texture;
        } else {
            this.sendNotification(NotificationNames.ERROR, `Texture ${id} not loaded`);
            return null;
        }
    }

    public addAssets(assets: Asset[]): this {
        this.vo.totalAssets += assets.length;

        assets.forEach(asset => {
            if (!this.vo.assetsCount[asset.priority]) {
                this.vo.assetsCount[asset.priority] = {total: 1, progress: 0};
            } else {
                this.vo.assetsCount[asset.priority].total++;
            }
        });

        this.loader.addAssets(assets);
        return this;
    }

    public load(): this {
        this.loader.load();
        return this;
    }

    private onAssetsProgress(args: { priority: number, progress: number }): void {
        window.console.log(`[AssetsProxy] onAssetsProgress ${JSON.stringify(args)}`);
        const percentFactor = this.vo.assetsCount[args.priority].total / this.vo.totalAssets;

        this.vo.loadingProgress += (args.progress - this.vo.assetsCount[args.priority].progress) * percentFactor;
        this.vo.assetsCount[args.priority].progress = args.progress;

        args.progress = this.vo.loadingProgress;

        this.sendNotification(NotificationNames.GROUP_ASSETS_PROGRESS, args);
    }

    private onAssetsLoaded(args: { priority: number, assets: LoadAsset[] }): void {
        window.console.log(`[AssetsProxy] onAssetsLoaded ${args.assets.map(loadAsset => loadAsset.asset.id)}`);
        this.sendNotification(NotificationNames.GROUP_ASSETS_LOADED, args);
    }

    private onAssetsError(args: LoadAsset): void {
        this.sendNotification(NotificationNames.ERROR, `Error loading ${args.asset.id}: ${args.error!.message}`);
    }

    private onAllAssetsLoaded(): void {
        window.console.log("[AssetsProxy] All assets loaded!");

        this.vo.totalAssets = 0;
        this.vo.loadingProgress = 0;
        this.vo.assetsCount = {};

        this.sendNotification(NotificationNames.ALL_ASSETS_LOADED);
    }
}
