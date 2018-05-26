import {BaseProxy} from "app/model/proxy/base-proxy";
import {AppVO} from "app/model/vo/app-vo";

export class AppProxy extends BaseProxy<AppVO> {

    public onRemove(): void {
        // TODO impl
    }

    public onRegister(): void {
        // TODO impl
    }

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

    public setAppWidth(w: number): void {
        this.vo.appWidth = w;
    }

    public getAppHeight(): number {
        return this.vo.appHeight;
    }

    public setAppHeight(h: number): void {
        this.vo.appHeight = h;
    }
}
