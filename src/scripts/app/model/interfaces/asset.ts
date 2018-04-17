export interface Asset {
    id: string;
    url: string;
    loaded: boolean;
    type: "texture" | "sound";
    priority: number;
}
