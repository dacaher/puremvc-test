import {Proxy} from "puremvc";

/**
 * @inheritdoc
 */
export abstract class BaseProxy<T> extends Proxy {

    /**
     * @inheritdoc
     */
    public abstract onRegister(): void;

    /**
     * @inheritdoc
     */
    public abstract onRemove(): void;

    /**
     * Retrieves VO instance.
     * @returns {T}
     */
    protected get vo(): T {
        return this.data as T;
    }
}
