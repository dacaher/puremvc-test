import {AppVO} from "app/model/vo/app-vo";
import {Proxy} from "puremvc";

export class AppProxy extends Proxy {

    public togglePlayingMusic(): void {
        this.vo.playingMusic = !this.vo.playingMusic;
    }

    public getTexts(): { bunnies: string, fullscreen: string, music: string } {
        return this.vo.texts;
    }

    public getPlayingMusic(): boolean {
        return this.vo.playingMusic;
    }

    public getAppWidth(): number {
        return this.vo.appWidth;
    }

    public getAppHeight(): number {
        return this.vo.appHeight;
    }

    private get vo(): AppVO {
        return this.data as AppVO;
    }
}
