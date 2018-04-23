import {BaseProxy} from "app/model/proxy/base-proxy";
import {SoundsVO} from "app/model/vo/sounds-vo";

export class SoundsProxy extends BaseProxy<SoundsVO> {
    public onRegister(): void {
        // TODO impl
    }

    public onRemove(): void {
        // TODO impl
    }

    public addSounds(sounds: { [key: string]: Howl }): void {
        this.vo.sounds = sounds;
    }

    public playSound(id: string): void {
        this.vo.sounds[id].play();
    }

    public stopSound(id: string): void {
        this.vo.sounds[id].stop();
    }
}
