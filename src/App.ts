export interface App {
    $getHeaders(): Promise<Record<string, string>>;

    search(query: string): Promise<any>;
    getPopular?(): Promise<any>;
    getAlbum(uri: string): Promise<any>;
    getArtist(uri: string): Promise<any>;
    getTrack?(uri: string): Promise<any>;
}