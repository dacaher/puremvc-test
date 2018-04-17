import {INotification, Mediator} from "puremvc";

/**
 * @inheritdoc
 */
export abstract class BaseMediator<T extends PIXI.Container> extends Mediator {

    /**
     * @inheritdoc
     */
    public onRemove(): void {
        this.removeListeners();
        this.view.destroy(); // TODO check destroy params just in case we want destroy children & children.texture & children.baseTexture...
    }

    /**
     * @inheritdoc
     */
    public abstract onRegister(): void;

    /**
     * @inheritdoc
     */
    public abstract listNotificationInterests(): string[];

    /**
     * @inheritdoc
     */
    public abstract handleNotification(notification: INotification): void;

    /**
     * @inheritdoc
     */
    protected abstract addListeners(): void;

    /**
     * @inheritdoc
     */
    protected abstract removeListeners(): void;

    /**
     * @inheritdoc
     */
    protected get view(): T {
        return this.viewComponent as T;
    }
}
