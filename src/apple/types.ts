type ArtworkBase = {
    bgColor: string;
    hasP3: boolean;
    height: number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url: string;
    width: number;
};

type ArtistArtwork = ArtworkBase & {
    defaultCropCode: string;
};

type HeroArtwork = ArtworkBase & {
    recommendedCropCodes: string[];
};

type EditorialArtwork = {
    centeredFullscreenBackground: ArtworkBase;
    originalFlowcaseBrick: ArtworkBase;
    storeFlowcase: ArtworkBase;
};

type HeroContent = {
    artwork: HeroArtwork;
};

type Hero = {
    content: HeroContent[];
};

type PlainEditorialNotes = {
    short: string;
};

type ArtistAttributes = {
    artistBio: string;
    artwork: ArtistArtwork;
    bornOrFormed: string;
    editorialArtwork: EditorialArtwork;
    genreNames: string[];
    hero: Hero[];
    isGroup: boolean;
    name: string;
    origin: string;
    plainEditorialNotes: PlainEditorialNotes;
    url: string;
};

type ResourceRef<T extends string> = {
    id: string;
    type: T;
    href: string;
};

type RelationshipList<T extends string> = {
    href: string;
    data: ResourceRef<T>[];
};

type ArtistRelationships = {
    bands: RelationshipList<'bands'>;
    persons: RelationshipList<'persons'>;
};

type ViewBase<T extends string> = {
    href: string;
    next?: string;
    attributes: {
        title: string;
    };
    data: ResourceRef<T>[];
    meta?: {
        count: number;
    };
};

type ArtistViews = {
    'all-upcoming-concerts': ViewBase<'concerts'> & { meta: { count: number } };
    'appears-on-albums': ViewBase<'albums'>;
    'compilation-albums': ViewBase<'albums'>;
    'featured-albums': ViewBase<'albums'>;
    'featured-release': ViewBase<never>;
    'full-albums': ViewBase<'albums'>;
    'latest-release': ViewBase<never>;
    'live-albums': ViewBase<'albums'>;
    'more-to-hear': ViewBase<'stations'>;
    'more-to-see': ViewBase<'uploaded-videos'>;
    'music-videos': ViewBase<'music-videos'>;
    playlists: ViewBase<'playlists'>;
    'radio-shows': ViewBase<'apple-curators'>;
    'similar-artists': ViewBase<'artists'>;
    singles: ViewBase<'albums'>;
    'top-songs': ViewBase<'songs'>;
};

type ViewOrder = keyof ArtistViews;

type ArtistMeta = {
    views: {
        order: ViewOrder[];
    };
};

type Artist = {
    id: string;
    type: 'artists';
    href: string;
    attributes: ArtistAttributes;
    relationships: ArtistRelationships;
    views: ArtistViews;
    meta: ArtistMeta;
};

type AudioTrait = 'atmos' | 'lossless' | 'lossy-stereo' | 'spatial' | 'hi-res-lossless';

type ContentRating = 'explicit' | 'clean';

type SuperHeroTall = ArtworkBase & {
    gradient: Record<string, unknown>;
};

type AlbumEditorialArtwork = {
    storeFlowcase?: ArtworkBase;
    subscriptionHero?: ArtworkBase;
    superHeroTall?: SuperHeroTall;
    centeredFullscreenBackground?: ArtworkBase;
};

type AlbumPlainEditorialNotes = {
    short?: string;
    standard?: string;
};

type PlayParams = {
    id: string;
    kind: 'album';
};

type AlbumAttributes = {
    artistName: string;
    artwork: ArtworkBase;
    audioTraits: AudioTrait[];
    contentRating?: ContentRating;
    copyright: string;
    editorialArtwork: AlbumEditorialArtwork;
    genreNames: string[];
    isCompilation: boolean;
    isComplete: boolean;
    isMasteredForItunes: boolean;
    isPrerelease: boolean;
    isSingle: boolean;
    name: string;
    plainEditorialNotes?: AlbumPlainEditorialNotes;
    playParams: PlayParams;
    recordLabel: string;
    releaseDate: string;
    trackCount: number;
    upc: string;
    url: string;
};

type Album = {
    id: string;
    type: 'albums';
    href: string;
    attributes: AlbumAttributes;
};

type ConcertAttributes = {
    endISODateTime: string;
    name: string;
    startISODateTime: string;
    timezone: string;
    url: string;
};

type ConcertRelationships = {
    venues: RelationshipList<'venues'>;
};

type Concert = {
    id: string;
    type: 'concerts';
    href: string;
    attributes: ConcertAttributes;
    relationships: ConcertRelationships;
};

type VideoTrait = '4K' | 'HDR';

type MusicVideoPlayParams = {
    id: string;
    kind: 'musicVideo';
};

type Preview = {
    artwork: ArtworkBase;
    hlsUrl: string;
    url: string;
};

type MusicVideoAttributes = {
    artistName: string;
    artwork: ArtworkBase;
    durationInMillis: number;
    editorialArtwork: Partial<AlbumEditorialArtwork>;
    genreNames: string[];
    has4K: boolean;
    hasHDR: boolean;
    isrc: string;
    name: string;
    playParams: MusicVideoPlayParams;
    previews: Preview[];
    releaseDate: string;
    url: string;
    videoTraits: VideoTrait[];
};

type MusicVideoRelationships = {
    artists: RelationshipList<'artists'>;
};

type MusicVideo = {
    id: string;
    type: 'music-videos';
    href: string;
    attributes: MusicVideoAttributes;
    relationships: MusicVideoRelationships;
};

type PersonAttributes = {
    name: string;
    primaryRole: string;
    roleDescription: string;
    url: string;
};

type Person = {
    id: string;
    type: 'persons';
    attributes: PersonAttributes;
};

type EditorialVideoEntry = {
    previewFrame: ArtworkBase;
    video: string;
};

type EditorialVideo = {
    motionMediumVideo16x9?: EditorialVideoEntry;
    motionSquareVideo1x1?: EditorialVideoEntry;
    motionTallVideo3x4?: EditorialVideoEntry;
    motionWideVideo21x9?: EditorialVideoEntry;
};

type CuratorEditorialArtwork = {
    bannerUber?: ArtworkBase;
    brandLogo?: ArtworkBase;
    epicStageWide?: ArtworkBase;
    musicFullscreenStatic16x9?: ArtworkBase;
    storeFlowcase?: ArtworkBase;
    subscriptionCover?: ArtworkBase;
    subscriptionHero?: ArtworkBase;
    superHeroTall?: ArtworkBase;
    superHeroWide?: ArtworkBase;
};

type CuratorPlainEditorialNotes = {
    name?: string;
    short?: string;
    standard?: string;
    tagline?: string;
};

type CuratorKind = 'Show' | 'Curator';

type AppleCuratorAttributes = {
    artwork: ArtworkBase;
    editorialArtwork: CuratorEditorialArtwork;
    editorialVideo: EditorialVideo;
    kind: CuratorKind;
    name: string;
    plainEditorialNotes: CuratorPlainEditorialNotes;
    shortName: string;
    showHostName: string;
    url: string;
};

type AppleCurator = {
    id: string;
    type: 'apple-curators';
    href: string;
    attributes: AppleCuratorAttributes;
};

type PlaylistDescription = {
    short?: string;
    standard?: string;
};

type PlaylistEditorialArtwork = {
    subscriptionCover?: ArtworkBase;
    subscriptionHero?: ArtworkBase;
};

type PlaylistEditorialVideo = {
    motionDetailSquare?: EditorialVideoEntry;
    motionDetailTall?: EditorialVideoEntry;
    motionSquareVideo1x1?: EditorialVideoEntry;
    motionWideVideo21x9?: EditorialVideoEntry;
};

type EditorialPlaylistKind = 'artist-franchise' | 'editorial' | 'kids' | 'managed' | 'podcasts' | 'sports';

type PlaylistType = 'editorial' | 'external' | 'personal-mix' | 'replay' | 'user-shared';

type PlaylistPlayParams = {
    id: string;
    kind: 'playlist';
    versionHash?: string;
};

type PlaylistPlainEditorialNotes = {
    name?: string;
    short?: string;
    standard?: string;
    tagline?: string;
};

type PlaylistAttributes = {
    artwork: ArtworkBase;
    audioTraits: AudioTrait[];
    curatorName: string;
    description?: PlaylistDescription;
    editorialArtwork: PlaylistEditorialArtwork;
    editorialPlaylistKind?: EditorialPlaylistKind;
    editorialVideo?: PlaylistEditorialVideo;
    hasCollaboration: boolean;
    isChart: boolean;
    lastModifiedDate: string;
    name: string;
    plainEditorialNotes?: PlaylistPlainEditorialNotes;
    playParams: PlaylistPlayParams;
    playlistType: PlaylistType;
    supportsSing: boolean;
    trackCount: number;
    url: string;
};

type Playlist = {
    id: string;
    type: 'playlists';
    href: string;
    attributes: PlaylistAttributes;
};

type SongPreview = {
    url: string;
};

type ExtendedAssetUrls = {
    enhancedHls?: string;
    lightweight?: string;
    lightweightPlus?: string;
    plus?: string;
    superLightweight?: string;
};

type SongPlayParams = {
    id: string;
    kind: 'song';
};

type SongAttributes = {
    albumArtistName: string;
    albumName: string;
    artistName: string;
    artwork: ArtworkBase;
    audioLocale: string;
    audioTraits: AudioTrait[];
    composerName?: string;
    contentRating?: ContentRating;
    discNumber: number;
    durationInMillis: number;
    editorialArtwork: Partial<AlbumEditorialArtwork>;
    extendedAssetUrls?: ExtendedAssetUrls;
    genreNames: string[];
    hasLyrics: boolean;
    hasTimeSyncedLyrics: boolean;
    isAppleDigitalMaster: boolean;
    isMasteredForItunes: boolean;
    isVocalAttenuationAllowed: boolean;
    isrc: string;
    name: string;
    playParams: SongPlayParams;
    previews: SongPreview[];
    releaseDate: string;
    trackNumber: number;
    url: string;
};

type SongRelationships = {
    albums: RelationshipList<'albums'>;
    artists: RelationshipList<'artists'>;
};

type Song = {
    id: string;
    type: 'songs';
    href: string;
    attributes: SongAttributes;
    relationships: SongRelationships;
};

type AirTime = {
    end: string;
    start: string;
};

type StationEditorialArtwork = {
    subscriptionCover?: ArtworkBase;
    subscriptionHero?: ArtworkBase;
    superHeroTall?: ArtworkBase;
    superHeroWide?: ArtworkBase;
};

type StationKind = 'streaming' | 'programmed';

type MediaKind = 'audio' | 'video';

type DrmType = 'fairplay' | 'playready' | 'widevine';

type StreamingRadioSubType = 'Episode' | 'Live' | 'Default';

type StationPlayParams = {
    format: string;
    hasDrm: boolean;
    id: string;
    kind: 'radioStation';
    mediaType: number;
    stationHash: string;
    streamingKind: number;
};

type StationPlainEditorialNotes = {
    name?: string;
    short?: string;
    standard?: string;
};

type StationAttributes = {
    airTime?: AirTime;
    artwork: ArtworkBase;
    durationInMillis?: number;
    editorialArtwork: StationEditorialArtwork;
    isLive: boolean;
    kind: StationKind;
    mediaKind: MediaKind;
    name: string;
    plainEditorialNotes?: StationPlainEditorialNotes;
    playParams: StationPlayParams;
    radioUrl: string;
    requiresSubscription: boolean;
    streamingRadioSubType?: StreamingRadioSubType;
    supportedDrms: DrmType[];
    url: string;
};

type Station = {
    id: string;
    type: 'stations';
    href: string;
    attributes: StationAttributes;
};

type AssetTokens = {
    '1080pHdVideo'?: string;
    sd480pVideo?: string;
    sdVideo?: string;
    sdVideoWithPlusAudio?: string;
};

type UploadedVideoEditorialArtwork = {
    superHeroTall?: ArtworkBase;
    superHeroWide?: ArtworkBase;
};

type UploadedVideoPlayParams = {
    id: string;
    kind: 'uploadedVideo';
};

type UploadedVideoAttributes = {
    artistName: string;
    artwork: ArtworkBase;
    assetTokens: AssetTokens;
    contentRatingsBySystem: Record<string, unknown>;
    durationInMilliseconds: number;
    editorialArtwork: UploadedVideoEditorialArtwork;
    editorialVideo: Partial<EditorialVideo>;
    name: string;
    playParams: UploadedVideoPlayParams;
    postUrl: string;
    uploadDate: string;
    uploadingArtistName: string;
};

type UploadedVideo = {
    id: string;
    type: 'uploaded-videos';
    href: string;
    attributes: UploadedVideoAttributes;
};

type GeoLocation = {
    latitude: number;
    longitude: number;
};

type StructuredAddress = {
    address: string;
    city: string;
    country: string;
    countryIsoCode: string;
    postCode: string;
    region: string;
};

type VenueAttributes = {
    geoLocation: GeoLocation;
    name: string;
    structuredAddress: StructuredAddress;
};

type Venue = {
    id: string;
    type: 'venues';
    href: string;
    attributes: VenueAttributes;
};

export interface ArtistResponse {
    data: ResourceRef<'artists'>[];
    resources: {
        albums: Record<number, Album>;
        'apple-curators': Record<number, AppleCurator>;
        artists: Record<number, Artist>;
        concerts: Record<string, Concert>;
        'music-videos': Record<number, MusicVideo>;
        persons: Record<number, Person>;
        playlists: Record<string, Playlist>;
        songs: Record<number, Song>;
        stations: Record<string, Station>;
        'uploaded-videos': Record<number, UploadedVideo>;
        venues: Record<string, Venue>;
    }
}

export interface AlbumResponse {
    data: ResourceRef<'albums'>[];
    resources: {
        albums: Record<number, Album>;
        'apple-curators': Record<number, AppleCurator>;
        artists: Record<number, Artist>;
        'music-videos': Record<number, MusicVideo>;
        playlists: Record<string, Playlist>;
        songs: Record<number, Song>;
    }
}

type SearchGroup<T extends string> = {
    href?: string;
    next?: string;
    groupId: string;
    name: string;
    data: ResourceRef<T>[];
};

export interface SearchResponse {
    results: {
        album?: SearchGroup<'albums'>;
        artist?: SearchGroup<'artists'>;
        music_video?: SearchGroup<'music-videos'>;
        playlist?: SearchGroup<'playlists'>;
        radio_episode?: SearchGroup<'stations'>;
        radio_show?: SearchGroup<'apple-curators'>;
        song?: SearchGroup<'songs'>;
        station?: SearchGroup<'stations'>;
        top?: SearchGroup<'albums' | 'artists' | 'songs' | 'playlists' | 'music-videos' | 'stations'>;
        video_extra?: SearchGroup<'uploaded-videos'>;
    };
    resources: {
        albums?: Record<number, Album>;
        'apple-curators'?: Record<number, AppleCurator>;
        artists?: Record<number, Artist>;
        'music-videos'?: Record<number, MusicVideo>;
        playlists?: Record<string, Playlist>;
        songs?: Record<number, Song>;
        stations?: Record<string, Station>;
        'uploaded-videos'?: Record<number, UploadedVideo>;
    };
    meta?: Record<string, unknown>;
}
