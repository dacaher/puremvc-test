import {INotification, Mediator} from "puremvc";

export abstract class BaseMediator<T extends PIXI.Container> extends Mediator {

    public onRemove(): void {
        this.removeListeners();
        this.view.destroy();
    }

    public abstract onRegister(): void;

    public abstract listNotificationInterests(): string[];

    public abstract handleNotification(notification: INotification): void;

    protected abstract addListeners(): void;

    protected abstract removeListeners(): void;

    private get view(): T {
        return this.viewComponent as T;
    }
}
