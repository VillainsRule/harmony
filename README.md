<div align='center'>
    <h1>harmony</h1>
    <h3>a keyless search tool for music streaming services</h3>
</div>

<br>

```
npm i harmonyy
pnpm i harmonyy
bun add harmonyy
```

each service lives in its own subpath and is the default export:

```ts
import Spotify from 'harmonyy/spotify';
import AppleMusic from 'harmonyy/apple';
import YoutubeMusic from 'harmonyy/youtube';
```

every service returns its own response structure, so results are not interchangeable between services. the response types are exported from the same subpath as the class; see `src/<service>/types.ts` for the full shapes.

## /spotify

```ts
import Spotify from 'harmonyy/spotify';

const spotify = new Spotify();

const results = await spotify.search('daft punk', { limit: 5 });
const popular = await spotify.getPopular();
const album = await spotify.getAlbum('spotify:album:2noRn2Aes5aoNVsU6iWThc');
const artist = await spotify.getArtist('spotify:artist:4tZwfgrHOc3mvqYlEYSvVi');
```

- `search(query, opts?)`
- `getPopular(timezone?)`
- `getAlbum(uri)`
- `getArtist(uri)`

`search` options: `offset`, `limit`, `numberOfTopResults`, `includeAudiobooks`, `includeArtistHasConcertsField`, `includePreReleases`, `includeLocalConcertsField`, `includeAuthors`. any other keys are passed through to spotify.

`uri` is a full spotify uri (`spotify:album:...`, `spotify:artist:...`).

## /apple

```ts
import AppleMusic from 'harmonyy/apple';

const apple = new AppleMusic('us'); // optional: storefront, defaults to 'us'

const results = await apple.search('daft punk');
const artist = await apple.getArtist('5468295');
const album = await apple.getAlbum('1440833098');
```

- `search(query)`
- `getArtist(id)`
- `getAlbum(id)`

ids are the numeric ids from apple music urls.

## /youtube

```ts
import YoutubeMusic from 'harmonyy/youtube';

const youtube = new YoutubeMusic();

const results = await youtube.search('daft punk');
const album = await youtube.getAlbum('MPREb_...');
const artist = await youtube.getArtist('UC...');
```

- `search(query)`
- `getAlbum(browseId)`
- `getArtist(browseId)`

`browseId` is the youtube music browse id (`MPREb_...` for albums, `UC...` for artists).

## App

every service class implements at minimum the `App` interface (`src/App.ts`):

```ts
export interface App {
    $getHeaders(): Promise<Record<string, string>>;

    search(query: string): Promise<any>;
    getPopular?(): Promise<any>;
    getAlbum(uri: string): Promise<any>;
    getArtist(uri: string): Promise<any>;
    getTrack?(uri: string): Promise<any>;
}
```

- `$getHeaders` builds the request headers (fetching tokens or cookies first if needed).
- `search`, `getAlbum` and `getArtist` are implemented by every service.
- `getPopular` and `getTrack` are optional and depend on whether the service supports it.

<br>

> *looking for searchtify? the same functionality exists in <code>harmonyy/spotify</code>, and the old code has been moved to <a href='https://github.com/VillainsRule/harmony/tree/searchtify'>a branch</a>*

<br>
<h5 align='center'>made with ❤️</h5>
