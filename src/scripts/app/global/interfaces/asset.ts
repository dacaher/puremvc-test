export interface Asset {
    id: string;
    url: string;
    type: "texture" | "sound";
    priority: number;
    loaded: boolean;
}
