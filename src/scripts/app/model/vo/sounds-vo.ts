export class SoundsVO {
    private _sounds: { [key: string]: Howl };

    constructor() {
        this._sounds = {};
    }

    public get sounds(): { [p: string]: Howl } {
        return this._sounds;
    }

    public set sounds(value: { [p: string]: Howl }) {
        this._sounds = value;
    }
}
