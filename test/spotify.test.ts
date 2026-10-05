import { describe, it, expect } from 'bun:test';

import Spotify from '../dist/spotify';

// toSecret / generateTOTP

describe('toSecret', () => {
    const spotify: Spotify = new Spotify();

    it('returns a Buffer', () => {
        const result = spotify.$toSecret([1, 2, 3]);
        expect(Buffer.isBuffer(result)).toBe(true);
    });

    it('is deterministic for the same input', () => {
        expect(spotify.$toSecret([10, 20, 30]).toString('hex'))
            .toBe(spotify.$toSecret([10, 20, 30]).toString('hex'));
    });

    it('produces different output for different inputs', () => {
        expect(spotify.$toSecret([1, 2, 3]).toString('hex'))
            .not.toBe(spotify.$toSecret([3, 2, 1]).toString('hex'));
    });

    it('handles empty input without throwing', () => {
        expect(() => spotify.$toSecret([])).not.toThrow();
    });
});

describe('generateTOTP', () => {
    const spotify: Spotify = new Spotify();

    it('returns a 6-digit string', () => {
        const totp = spotify.$generateTOTP();
        expect(totp).toMatch(/^\d{6}$/);
    });

    it('is consistent within the same 30s window', () => {
        const t = Date.now();
        expect(spotify.$generateTOTP(t)).toBe(spotify.$generateTOTP(t));
    });

    it('differs across 30s boundaries', () => {
        const before = spotify.$generateTOTP(0);
        const after = spotify.$generateTOTP(30_000);
        // not guaranteed but virtually certain with any real secret
        expect(before).not.toBe(after);
    });

    it('pads short codes to 6 digits', () => {
        // brute-force a timestamp that produces a small code
        let found: string | null = null;
        for (let i = 0; i < 10_000; i++) {
            const code = spotify.$generateTOTP(i * 30_000);
            if (parseInt(code) < 100) { found = code; break; }
        }
        if (found) expect(found.length).toBe(6);
        // if no small code found in range, test is vacuously fine
    });
});

// getVariables

describe('getVariables', () => {
    const spotify: Spotify = new Spotify();

    it('returns all required fields', async () => {
        const vars = await spotify.$getVariables();
        expect(vars).toHaveProperty('buildVer');
        expect(vars).toHaveProperty('buildDate');
        expect(vars).toHaveProperty('clientVersion');
        expect(vars).toHaveProperty('serverTime');
    }, 15_000);

    it('sets deviceId as a side effect', async () => {
        await spotify.$getVariables();
        expect(spotify.$deviceId).toBeTruthy();
    }, 15_000);

    it('caches result on this.variables', async () => {
        const vars = await spotify.$getVariables();
        expect(spotify.$variables).toBe(vars);
    }, 15_000);
});

// pullAccessToken

describe('pullAccessToken', () => {
    const spotify: Spotify = new Spotify();

    it('sets a non-empty accessToken string', async () => {
        await spotify.$pullAccessToken();
        expect(spotify.$accessToken.accessToken).toBeTruthy();
    }, 15_000);

    it('sets a clientId', async () => {
        await spotify.$pullAccessToken();
        expect(spotify.$accessToken.clientId).toBeTruthy();
    }, 15_000);

    it('sets a future expiry timestamp', async () => {
        await spotify.$pullAccessToken();
        expect(spotify.$accessToken.accessTokenExpirationTimestampMs).toBeGreaterThan(Date.now());
    }, 15_000);
});

// getHeaders

describe('getHeaders', () => {
    const spotify: Spotify = new Spotify();

    it('returns an Authorization header with Bearer token', async () => {
        const headers = await spotify.$getHeaders();
        expect(headers['Authorization']).toMatch(/^Bearer .+/);
    }, 15_000);

    it('returns required Spotify web player headers', async () => {
        const headers = await spotify.$getHeaders();
        expect(headers['App-Platform']).toBe('WebPlayer');
        expect(headers['Origin']).toBe('https://open.spotify.com');
    }, 15_000);

    it('refreshes token when expired', async () => {
        await spotify.$pullAccessToken();
        spotify.$accessToken.accessTokenExpirationTimestampMs = Date.now() - 1;
        const headers = await spotify.$getHeaders();
        expect(headers['Authorization']).toMatch(/^Bearer .+/);
        expect(spotify.$accessToken.accessTokenExpirationTimestampMs).toBeGreaterThan(Date.now());
    }, 20_000);
});

// search

describe('search', () => {
    const spotify: Spotify = new Spotify();

    it('returns a searchV2 object', async () => {
        const result = await spotify.search('faith the weeknd');
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result.tracksV2.items[0].item.data.__typename).toBe('Track');
        if (result.tracksV2.items[0].item.data.__typename === 'Track') {
            expect(result.tracksV2.items[0].item.data.name).toBe('Faith');
            expect(result.tracksV2.items[0].item.data.albumOfTrack.name).toInclude('After Hours');
        }
    }, 15_000);

    it('respects limit option', async () => {
        const result = await spotify.search('radiohead', { limit: 3 });
        expect(result).toBeDefined();
        expect(result.tracksV2.items.length).toBe(3);
    }, 15_000);

    it('handles obscure queries without throwing', async () => {
        const result = await spotify.search('xqzjwplmnfoo12345');
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result.tracksV2.totalCount).toBe(0);
    }, 15_000);
});

// getPopular

describe('getPopular', () => {
    const spotify: Spotify = new Spotify();

    it('returns an array of sections', async () => {
        const result = await spotify.getPopular();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].uri).toBeTypeOf('string');
        expect(result[0].data.title.transformedLabel).toBeTypeOf('string');
        expect(result[0].sectionItems.pagingInfo.nextOffset).toBeTypeOf('number');
    }, 15_000);

    it('accepts a custom timezone', async () => {
        const result = await spotify.getPopular('America/New_York');
        expect(Array.isArray(result)).toBe(true);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].uri).toBeTypeOf('string');
        expect(result[0].data.title.transformedLabel).toBeTypeOf('string');
        expect(result[0].sectionItems.pagingInfo.nextOffset).toBeTypeOf('number');
    }, 15_000);
});

// getAlbum

describe('getAlbum', () => {
    const spotify: Spotify = new Spotify();

    const albumUri = 'spotify:album:4yP0hdKOZPNshxUOjY0cZj';

    it('returns album data for a valid URI', async () => {
        const result = await spotify.getAlbum(albumUri);
        expect(result).toBeDefined();
        expect(result.name).toBe('After Hours');
        expect(result.label).toBe('Republic Records');
        expect(result.date.isoString).toBe('2020-03-20T00:00:00Z');
        expect(result.uri).toBe(albumUri);
        expect(result.artists.totalCount).toBe(1); // my goat SOLOS!!
        expect(result.discs.totalCount).toBe(1);
    }, 15_000);
});

// getArtist

describe('getArtist', () => {
    const spotify: Spotify = new Spotify();

    const artistUri = 'spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ';

    it('returns artist data for a valid URI', async () => {
        const result = await spotify.getArtist(artistUri);
        expect(result).toBeDefined();
        expect(result.id).toBe(artistUri.split(':')[2]);
        expect(result.profile.name).toBe('The Weeknd');
        expect(result.profile.biography?.text).toInclude('After Hours');
        // if he fall offs my test is gonna fail
        // in abel we trust
        expect(result.stats.monthlyListeners).toBeGreaterThan(50_000_000);
        expect(result.uri).toBe(artistUri);
    }, 15_000);
});