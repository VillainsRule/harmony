import { describe, it, expect } from 'bun:test';

import YoutubeMusic from '../dist/youtube';

// getVariables

describe('getData', () => {
    const yt = new YoutubeMusic();

    it('saves all required fields', async () => {
        await yt.$getData();
        expect(Number(yt.$youtubeClientVersion)).toBeGreaterThan(0);
        expect(yt.$youtubeClientBuild).toStartWith('1.');
        expect(yt.$googVisitorId).toBeTypeOf('string');
        expect(yt.$googVisitorId).toEndWith('%3D');
        expect(yt.$googVisitorId.length).toBeGreaterThan(500);
    }, 15_000);
});

// getCookies

describe('getCookies', () => {
    const yt = new YoutubeMusic();

    it('saves a cookie string', async () => {
        await yt.$getCookies();
        expect(yt.$cookieString).toBeTypeOf('string');
        expect(yt.$cookieString.length).toBeGreaterThan(100);
        expect(yt.$cookieString).toInclude('__Secure-YNID');
    }, 15_000);
});

// getHeaders

describe('getHeaders', () => {
    const yt = new YoutubeMusic();

    it('returns an object with cookies', async () => {
        const headers = await yt.$getHeaders();
        expect(headers['Cookie']).toInclude('__Secure-YNID');
    }, 15_000);

    it('returns an object with x-* headers', async () => {
        const headers = await yt.$getHeaders();
        expect(headers['x-youtube-client-name']).toBeTypeOf('string');
        expect(headers['x-youtube-client-version']).toBeTypeOf('string');
        expect(headers['X-Goog-Visitor-Id']).toBeTypeOf('string');
    }, 15_000);
});

// search

describe('search', () => {
    const yt = new YoutubeMusic();

    it('returns a searchV2 object', async () => {
        const result = await yt.search('blinding lights on after hours by the weeknd');
        expect(result).toBeDefined();
        expect(result).toBeTypeOf('object');
        expect(result[1].itemSectionRenderer!.contents[0].musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs![0].text).toBe('Blinding Lights');
        expect(result[1].itemSectionRenderer!.contents[0].musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs![0].text).toBe('Song');
        expect(result[1].itemSectionRenderer!.contents[0].musicResponsiveListItemRenderer.flexColumns[2].musicResponsiveListItemFlexColumnRenderer.text.runs![0].text).toEndWith('B plays');
    }, 15_000);
});

// getAlbum

describe('getAlbum', () => {
    const yt = new YoutubeMusic();

    const albumUri = 'MPREb_TH6Wut5eTMQ';

    it('returns album data for a valid URI', async () => {
        const result = await yt.getAlbum(albumUri);
        expect(result).toBeDefined();

        const header = result.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicResponsiveHeaderRenderer;
        expect(header.title.runs[0].text).toBe('After Hours');
        expect(header.subtitle.runs[0].text).toBe('Album');
        expect(header.subtitle.runs[2].text).toBe('2020');
        expect(header.secondSubtitle.runs[0].text).toBe('14 songs');

        const tracks = result.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer.contents;
        expect(tracks.length).toBe(14);
        expect(tracks[0].musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs![0].text).toBe('Alone Again');
        expect(result.microformat.microformatDataRenderer.description).toBe('Album \u2022 The Weeknd');
    }, 15_000);
});

// getArtist

describe('getArtist', () => {
    const yt = new YoutubeMusic();

    const artistUri = 'UClYV6hHlupm_S_ObS1W-DYw';

    it('returns artist data for a valid URI', async () => {
        const result = await yt.getArtist(artistUri);
        expect(result).toBeDefined();

        const header = result.header.musicImmersiveHeaderRenderer;
        expect(header.title.runs[0].text).toBe('The Weeknd');
        expect(header.description!.runs[0].text).toInclude('The Weeknd');
        expect(result.microformat.microformatDataRenderer.title).toBe('The Weeknd');

        const sections = result.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents;
        expect(sections.length).toBeGreaterThan(0);
        expect(sections[0].musicShelfRenderer).toBeDefined();
    }, 15_000);
});