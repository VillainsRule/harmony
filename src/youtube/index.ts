import type { AlbumResponse, ArtistResponse, SearchResponse } from './types.js';

import { App } from '../App.js';

export * from './types.js';

export default class YoutubeMusic implements App {
    $youtubeClientVersion: string;
    $youtubeClientBuild: string;
    $googVisitorId: string;
    $cookieString: string;

    async $getData(): Promise<void> {
        const dataReq = await fetch('https://music.youtube.com/sw.js_data');
        const dataRes = await dataReq.text();
        const dataArr = dataRes.split(',');

        this.$youtubeClientVersion = dataArr.find(e => !isNaN(parseInt(e)))!;
        this.$youtubeClientBuild = dataArr.find(e => e.startsWith('"1.'))!.slice(1, -1);
        this.$googVisitorId = dataArr[15].slice(1, -1);
    }

    async $getCookies(): Promise<void> {
        const data = await fetch('https://music.youtube.com');
        this.$cookieString = data.headers.getSetCookie().map(e => e.split(' Domain')[0]).join(' ');
    }

    async $getHeaders(): Promise<Record<string, string>> {
        if (!this.$youtubeClientVersion) await this.$getData();
        if (!this.$cookieString) await this.$getCookies();

        return {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'Cookie': this.$cookieString,
            'Origin': 'https://music.youtube.com',
            'Referer': 'https://music.youtube.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            'X-Goog-Visitor-Id': this.$googVisitorId,
            'x-youtube-bootstrap-logged-in': 'false',
            'x-youtube-client-name': this.$youtubeClientVersion,
            'x-youtube-client-version': this.$youtubeClientBuild
        }
    }

    async search(query: string): Promise<SearchResponse> {
        if (!this.$youtubeClientBuild) await this.$getData();

        const payload = {
            context: {
                client: {
                    clientName: 'WEB_REMIX',
                    clientVersion: this.$youtubeClientBuild,
                }
            },
            query,
            suggestStats: {
                validationStatus: 'VALID',
                parameterValidationStatus: 'VALID_PARAMETERS',
                clientName: 'youtube-music',
                searchMethod: 'ENTER_KEY',
                inputMethods: ['KEYBOARD'],
                originalQuery: query
            }
        };

        const searchReq = await fetch('https://music.youtube.com/youtubei/v1/search?prettyPrint=false', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: await this.$getHeaders()
        });

        const searchRes = await searchReq.json() as any;
        return searchRes.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.map((a: any) => a.musicCardShelfRenderer || a.musicShelfRenderer || a);
    }

    async #browse<T>(browseId: string): Promise<T> {
        if (!this.$youtubeClientBuild) await this.$getData();

        const payload = {
            context: {
                client: {
                    clientName: 'WEB_REMIX',
                    clientVersion: this.$youtubeClientBuild,
                }
            },
            browseId
        };

        const browseReq = await fetch('https://music.youtube.com/youtubei/v1/browse?prettyPrint=false', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: await this.$getHeaders()
        });

        return await browseReq.json() as T;
    }

    getAlbum(uri: string): Promise<AlbumResponse> {
        return this.#browse<AlbumResponse>(uri);
    }

    getArtist(uri: string): Promise<ArtistResponse> {
        return this.#browse<ArtistResponse>(uri);
    }
}
