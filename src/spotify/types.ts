// https://github.com/NuclearPlayer/nuclear-plugin-something/blob/268992def6f8e052b21f3014bc7992809bf39e67/src/types.ts#L235 THANK YOU

export type OperationName =
    | 'searchArtists'
    | 'searchAlbums'
    | 'searchTracks'
    | 'queryArtistOverview'
    | 'queryArtistDiscographyAll'
    | 'getAlbum'
    | 'fetchPlaylist'
    | 'fetchPlaylistContents';

export type CoverArtSource = {
    height: number | null;
    url: string;
    width: number | null;
};

export type ExtractedColorItem = {
    hex: string;
    isFallback: boolean;
};

export type ExtractedColors = {
    colorDark: ExtractedColorItem;
};

export type AlbumCoverArt = {
    extractedColors: ExtractedColors;
    sources: CoverArtSource[];
};

export type AvatarImage = {
    extractedColors: ExtractedColors;
    sources: CoverArtSource[];
};

export type GalleryImageItem = {
    sources: CoverArtSource[];
};

export type Gallery = {
    items: GalleryImageItem[];
};

export type ArtistVisuals = {
    avatarImage: AvatarImage | null;
    gallery?: Gallery;
};

export type Duration = {
    totalMilliseconds: number;
};

export type ContentRating = {
    label: 'NONE' | 'EXPLICIT';
};

export type Playability = {
    playable: boolean;
    reason: 'PLAYABLE';
};

export type SharingInfo = {
    shareId: string;
    shareUrl: string;
};

export type CopyrightItem = {
    text: string;
    type: 'C' | 'P';
};

export type Copyright = {
    items: CopyrightItem[];
};

export type FullDate = {
    day: number;
    month: number;
    precision: 'DAY' | 'MONTH' | 'YEAR';
    year: number;
    isoString?: string;
};

export type AlbumDate = {
    year: number;
};

export type TracksSummary = {
    totalCount: number;
};

export type ReleaseType = 'ALBUM' | 'SINGLE' | 'EP' | 'COMPILATION';

export type PaginatedResponse<Item> = {
    items: Item[];
    totalCount: number;
};

export type ArtistSimplified = {
    profile: { name: string };
    uri: string;
    visuals?: ArtistVisuals;
};

export type AlbumOfTrack = {
    coverArt: AlbumCoverArt;
    id: string;
    name: string;
    uri: string;
};

export type ArtistStats = {
    followers: number;
    monthlyListeners: number;
    worldRank: number;
};

export type Album = {
    __typename: 'Album';
    artists: { items: ArtistSimplified[] };
    coverArt: AlbumCoverArt;
    date: AlbumDate;
    name: string;
    playability: Playability;
    type: ReleaseType;
    uri: string;
};

export type Track = {
    __typename: 'Track';
    albumOfTrack: AlbumOfTrack;
    artists: { items: ArtistSimplified[] };
    contentRating: ContentRating;
    duration: Duration;
    discNumber: number;
    id: string;
    name: string;
    playability: Playability;
    playcount: string;
    trackNumber: number;
    uri: string;
};

export type NotFound = {
    __typename: 'NotFound';
};

export type ArtistTopTrack = {
    track: {
        albumOfTrack: AlbumOfTrack;
        artists: { items: ArtistSimplified[] };
        contentRating: ContentRating;
        discNumber: number;
        duration: Duration;
        id: string;
        name: string;
        playability: Playability;
        playcount: string;
        uri: string;
    };
};

export type TopTracksSection = {
    items: ArtistTopTrack[];
};

export type ReleaseItem = {
    copyright: Copyright;
    coverArt: AlbumCoverArt;
    date: FullDate;
    id: string;
    label: string;
    name: string;
    playability: Playability;
    sharingInfo: SharingInfo;
    tracks: TracksSummary;
    type: ReleaseType;
    uri: string;
};

export type ReleaseSection = PaginatedResponse<ReleaseItem>;

export type Discography = {
    all?: PaginatedResponse<{ releases: PaginatedResponse<ReleaseItem> }>;
    albums: ReleaseSection;
    compilations: ReleaseSection;
    latest: ReleaseItem;
    popularReleasesAlbums: ReleaseSection;
    singles: ReleaseSection;
    topTracks: TopTracksSection;
};

export type RelatedArtistsSection = PaginatedResponse<Artist>;

export type RelatedContent = {
    relatedArtists: RelatedArtistsSection;
};

export type Artist = {
    __typename: 'Artist';
    id: string;
    uri: string;
    profile: {
        name: string;
        verified?: boolean;
        biography?: { type: string; text: string };
    };
    headerImage: { data: { sources: CoverArtSource[] } } | null;
    visuals?: ArtistVisuals;
    discography: Discography;
    relatedContent: RelatedContent;
    sharingInfo: SharingInfo;
    stats: ArtistStats;
};

export type AlbumResponseWrapper = {
    __typename: 'AlbumResponseWrapper';
    data: Album;
};

export type ArtistResponseWrapper = {
    __typename: 'ArtistResponseWrapper';
    data: Artist;
};

export type TrackResponseWrapper = {
    __typename: 'TrackResponseWrapper';
    data: Track | NotFound;
};

export type SearchResultItemWrapper<Result> = {
    item: Result;
};

export type AlbumOrPrereleasePage = {
    __typename: 'AlbumOrPrereleasePage';
    items: AlbumResponseWrapper[];
    totalCount: number;
};

export type SearchV2 = {
    albumsV2: AlbumOrPrereleasePage;
    artists: PaginatedResponse<ArtistResponseWrapper>;
    tracksV2: PaginatedResponse<SearchResultItemWrapper<TrackResponseWrapper>>;
};

export type AlbumUnion = {
    __typename: 'AlbumUnion';
    copyright: Copyright;
    date: FullDate;
    label: string;
    name: string;
    playability: Playability;
    type: ReleaseType;
    artists: PaginatedResponse<ArtistSimplified>;
    coverArt: AlbumCoverArt;
    discs: PaginatedResponse<{ number: number; tracks: { totalCount: number } }>;
    tracksV2: PaginatedResponse<{ track: Track }>;
    uri: string;
};

export type PlaylistImageItem = {
    extractedColors?: ExtractedColors;
    sources: CoverArtSource[];
};

export type PlaylistOwner = {
    __typename: string;
    uri: string;
    username: string;
    name: string;
    avatar?: {
        sources: CoverArtSource[];
    };
};

export type PlaylistTrackData = {
    __typename: 'Track' | string;
    uri: string;
    name: string;
    trackDuration: Duration;
    playcount?: string;
    albumOfTrack: {
        uri: string;
        name: string;
        artists: { items: ArtistSimplified[] };
        coverArt: AlbumCoverArt;
    };
    artists: { items: ArtistSimplified[] };
    discNumber: number;
    trackNumber: number;
    playability: Playability;
    contentRating: ContentRating;
};

export type PlaylistContentItem = {
    uid: string;
    addedAt: { isoString: string };
    addedBy?: { data: PlaylistOwner };
    item: {
        __typename: string;
        data: PlaylistTrackData;
    };
};

export type PlaylistContent = {
    __typename: string;
    totalCount: number;
    pagingInfo: { offset: number; limit: number };
    items: PlaylistContentItem[];
};

export type PlaylistV2 = {
    __typename: string;
    uri: string;
    name: string;
    description: string;
    ownerV2: { data: PlaylistOwner };
    images: { items: PlaylistImageItem[] };
    collaborative: boolean;
    followers: number;
    sharingInfo: SharingInfo;
    content: PlaylistContent;
};

export type PathfinderPlaylistResponse = {
    data: { playlistV2: PlaylistV2 };
    extensions: Record<string, unknown>;
};

export type PathfinderSearchResponse = {
    data: { searchV2: SearchV2 };
    extensions: Record<string, unknown>;
};

export type PathfinderArtistOverviewResponse = {
    data: { artistUnion: Artist };
    extensions: Record<string, unknown>;
};

export type PathfinderGetAlbumResponse = {
    data: { albumUnion: AlbumUnion };
    extensions: Record<string, unknown>;
};

export type HomeSubtitle = {
    transformedLabel: string;
    translatedBaseText: string | null;
};

export type HomeTitle = {
    transformedLabel: string;
    translatedBaseText: string | null;
};

export type HomeSectionData = {
    __typename: 'HomeGenericSectionData';
    headerEntity: { __typename: string };
    subtitle: HomeSubtitle;
    title: HomeTitle;
};

export type PlaylistAttribute = {
    key: string;
    value: string;
};

export type PlaylistOwnerUser = {
    __typename: 'User';
    name: string;
    uri: string;
};

export type HomePlaylist = {
    __typename: 'Playlist';
    attributes: PlaylistAttribute[];
    description: string;
    format: string;
    images: { items: PlaylistImageItem[] };
    name: string;
    ownerV2: { data: PlaylistOwnerUser };
    uri: string;
};

export type HomePlaylistResponseWrapper = {
    __typename: 'PlaylistResponseWrapper';
    data: HomePlaylist;
};

export type HomeSectionItemContent =
    | TrackResponseWrapper
    | ArtistResponseWrapper
    | AlbumResponseWrapper
    | HomePlaylistResponseWrapper;

export type HomeSectionItem = {
    data: null;
    content: HomeSectionItemContent;
    uri: string;
};

export type HomeSectionItems = {
    items: HomeSectionItem[];
    pagingInfo: { nextOffset: number | null };
    totalCount: number;
};

export type HomeSection = {
    data: HomeSectionData;
    sectionItems: HomeSectionItems;
    uri: string;
};

export type PathfinderHomeResponse = {
    data: {
        home: {
            sectionContainer: {
                sections: {
                    items: HomeSection[];
                };
            };
        };
    };
    extensions: Record<string, unknown>;
};