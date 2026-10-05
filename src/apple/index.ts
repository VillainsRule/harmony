import type { AlbumResponse, ArtistResponse, SearchResponse } from './types.js';

import type { App } from '../App.js';

export * from './types.js';

export default class AppleMusic implements App {
    authorization: string;

    storefront = 'us';

    constructor(storefront = 'us') {
        this.storefront = storefront;
    }

    async getAuthorization(): Promise<void> {
        const mainPageReq = await fetch(`https://music.apple.com/${this.storefront}/new`);
        const mainPage = await mainPageReq.text();
        const indexFileName = mainPage.match(/\<script type="module" crossorigin src="(.*?)"\>/)![1];

        const indexFileReq = await fetch(`https://music.apple.com${indexFileName}`);
        const indexFile = await indexFileReq.text();

        this.authorization = indexFile.match(/="(eyJ.*?)"/)![1];
    }

    async $getHeaders(): Promise<Record<string, string>> {
        if (!this.authorization) await this.getAuthorization();

        return {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Authorization': `Bearer ${this.authorization}`,
            'Cache-Control': 'no-cache',
            'Cookie': 'geo=US',
            'Origin': 'https://music.apple.com',
            'Referer': 'https://music.apple.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
        }
    }

    async search(query: string): Promise<SearchResponse> {
        const url = new URL(`https://amp-api-edge.music.apple.com/v1/catalog/${this.storefront}/search`);

        url.searchParams.append('art[music-videos:url]', 'c');
        url.searchParams.append('art[url]', 'f');
        url.searchParams.append('extend', 'artistUrl');
        url.searchParams.append('fields[albums]', 'artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialNotes,name,playParams,releaseDate,url,trackCount');
        url.searchParams.append('fields[artists]', 'url,name,artwork');
        url.searchParams.append('format[resources]', 'map');
        url.searchParams.append('include[albums]', 'artists');
        url.searchParams.append('include[music-videos]', 'artists');
        url.searchParams.append('include[songs]', 'artists');
        url.searchParams.append('include[stations]', 'radio-show');
        url.searchParams.append('l', 'en-US');
        url.searchParams.append('limit', '21');
        url.searchParams.append('omit[resource]', 'autos');
        url.searchParams.append('platform', 'web');
        url.searchParams.append('relate[albums]', 'artists');
        url.searchParams.append('relate[songs]', 'albums');
        url.searchParams.append('term', query);
        url.searchParams.append('types', 'activities,albums,apple-curators,artists,curators,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes,uploaded-videos');
        url.searchParams.append('with', 'lyricHighlights,lyrics,naturalLanguage,serverBubbles,subtitles');

        const searchReq = await fetch(url.toString(), { headers: await this.$getHeaders() });
        const searchRes = await searchReq.json() as SearchResponse;

        return searchRes;
    }

    async getArtist(uri: string): Promise<ArtistResponse> {
        const url = new URL(`https://amp-api.music.apple.com/v1/catalog/${this.storefront}/artists/${uri}`);

        url.searchParams.set('art[url]', 'c,f');
        url.searchParams.set('extend', 'artistBio,bornOrFormed,editorialArtwork,editorialVideo,extendedAssetUrls,hero,isGroup,origin,plainEditorialNotes,seoDescription,seoTitle');
        url.searchParams.set('extend[playlists]', 'trackCount');
        url.searchParams.set('format[resources]', 'map');
        url.searchParams.set('include', 'record-labels,artists,persons,bands');
        url.searchParams.set('include[concerts]', 'venues');
        url.searchParams.set('include[music-videos]', 'artists');
        url.searchParams.set('include[songs]', 'artists,albums');
        url.searchParams.set('l', 'en-US');
        url.searchParams.set('limit[all-upcoming-concerts]', '8');
        url.searchParams.set('limit[artists:top-songs]', '24');
        url.searchParams.set('meta[albums:tracks]', 'popularity');
        url.searchParams.set('omit[resource]', 'autos');
        url.searchParams.set('platform', 'web');
        url.searchParams.set('views', 'all-upcoming-concerts,appears-on-albums,compilation-albums,featured-albums,featured-on-albums,featured-release,full-albums,latest-release,live-albums,more-to-hear,more-to-see,music-videos,playlists,radio-shows,similar-artists,singles,top-songs');

        const artistReq = await fetch(url.toString(), { headers: await this.$getHeaders() });
        const artistRes = await artistReq.json() as any;

        return artistRes;
    }

    async getAlbum(uri: string): Promise<AlbumResponse> {
        const url = new URL(`https://amp-api.music.apple.com/v1/catalog/${this.storefront}/albums/${uri}`);

        url.searchParams.set('art[url]', 'f');
        url.searchParams.set('extend', 'editorialArtwork,editorialVideo,extendedAssetUrls,offers,seoDescription,seoTitle');
        url.searchParams.set('fields[artists]', 'name,url');
        url.searchParams.set('fields[curators]', 'name');
        url.searchParams.set('fields[record-labels]', 'name,url');
        url.searchParams.set('format[resources]', 'map');
        url.searchParams.set('include', 'record-labels,artists');
        url.searchParams.set('include[music-videos]', 'artists');
        url.searchParams.set('include[playlists]', 'curator');
        url.searchParams.set('include[songs]', 'artists,composers,albums');
        url.searchParams.set('l', 'en-US');
        url.searchParams.set('meta[albums:tracks]', 'popularity');
        url.searchParams.set('platform', 'web');
        url.searchParams.set('views', 'appears-on,audio-extras,more-by-artist,other-versions,related-videos,video-extras,you-might-also-like');

        const req = await fetch(url.toString(), { headers: await this.$getHeaders() });
        const data = await req.json() as any;

        return data;
    }
}