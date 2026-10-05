import { describe, it, expect } from 'bun:test';

import AppleMusic from '../dist/apple';

// getHeaders

describe('getHeaders', () => {
    const appleMusic: AppleMusic = new AppleMusic();

    it('returns an Authorization header with Bearer token', async () => {
        const headers = await appleMusic.$getHeaders();
        expect(headers['Authorization']).toMatch(/^Bearer .+/);
    }, 15_000);

    it('returns required Spotify web player headers', async () => {
        const headers = await appleMusic.$getHeaders();
        expect(headers['Cookie']).toBe('geo=US');
        expect(headers['Origin']).toBe('https://music.apple.com');
    }, 15_000);
});

// search

describe('search', () => {
    const appleMusic: AppleMusic = new AppleMusic();

    it('returns a search response object', async () => {
        const result = await appleMusic.search('blinding lights on after hours by the weeknd');
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        const ref = result.results.song!.data[0];
        expect(ref.type).toBe('songs');
        const song = result.resources.songs![ref.id as any];
        expect(song.attributes.name).toBe('Blinding Lights');
        expect(song.attributes.albumName).toInclude('After Hours');
    }, 15_000);

    it('respects default limit', async () => {
        const result = await appleMusic.search('radiohead');
        expect(result).toBeDefined();
        expect(result.results.song!.data.length).toBeGreaterThan(0);
        expect(result.results.song!.data.length).toBeLessThanOrEqual(21);
    }, 15_000);

    it('handles obscure queries without throwing', async () => {
        const result = await appleMusic.search('xqzjwplmnfoo12345');
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result.results.top!.data[0].type).toBeOneOf(['songs', 'albums', 'artists']);
    }, 15_000);
});

// getAlbum

describe('getAlbum', () => {
    const appleMusic: AppleMusic = new AppleMusic();

    const albumUri = '1499378108';

    it('returns album data for a valid URI', async () => {
        const result = await appleMusic.getAlbum(albumUri);
        expect(result).toBeDefined();

        const album = result.resources.albums[albumUri];
        expect(album).toBeDefined();

        expect(album.id).toBe(albumUri);
        expect(album.attributes.name).toBe('After Hours');
        expect(album.attributes.copyright).toInclude('Republic Records');
        expect(album.attributes.releaseDate).toBe('2020-03-20');
        expect(album.attributes.url).toBe('https://music.apple.com/us/album/after-hours/1499378108');
        expect(album.attributes.trackCount).toBe(14);
    }, 15_000);
});

// getArtist

describe('getArtist', () => {
    const appleMusic: AppleMusic = new AppleMusic();

    const artistUri = '479756766';

    it('returns artist data for a valid URI', async () => {
        const result = await appleMusic.getArtist(artistUri);
        expect(result).toBeDefined();

        const artist = result.resources.artists[artistUri];
        expect(artist).toBeDefined();

        expect(artist.id).toBe(artistUri);
        expect(artist.attributes.bornOrFormed).toBe('February 16, 1990');
        expect(artist.attributes.name).toBe('The Weeknd');
        expect(artist.attributes.isGroup).toBe(false);
        expect(artist.attributes.url).toBe('https://music.apple.com/us/artist/the-weeknd/479756766');

        expect(artist.views['full-albums'].data.length).toBeGreaterThan(0);
    }, 15_000);
});