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
        Object.keys(sounds).forEach(key => {
            this.vo.sounds[key] = sounds[key];
        });
    }

    public playSound(id: string): void {
        if (this.vo.sounds[id]) {
            this.vo.sounds[id].play();
        }
    }

    public stopSound(id: string): void {
        if (this.vo.sounds[id]) {
            this.vo.sounds[id].stop();
        }
    }
}
