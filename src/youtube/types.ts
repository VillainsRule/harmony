type Run = {
    text: string;
    navigationEndpoint?: NavigationEndpoint;
};

type Runs = {
    runs: Run[];
};

type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

type MusicThumbnailRenderer = {
    musicThumbnailRenderer: {
        thumbnail: {
            thumbnails: Thumbnail[];
        };
        thumbnailCrop: string;
        thumbnailScale: string;
    };
};

type Icon = {
    iconType: string;
};

type BrowseEndpoint = {
    browseId: string;
    params?: string;
    browseEndpointContextSupportedConfigs?: {
        browseEndpointContextMusicConfig: {
            pageType: string;
        };
    };
};

type WatchEndpoint = {
    videoId?: string;
    playlistId?: string;
    index?: number;
    params?: string;
    playerParams?: string;
    playlistSetVideoId?: string;
    watchEndpointMusicSupportedConfigs?: {
        watchEndpointMusicConfig: {
            musicVideoType: string;
        };
    };
};

type WatchPlaylistEndpoint = {
    playlistId: string;
    params?: string;
};

type ShareEntityEndpoint = {
    serializedShareEntity: string;
    sharePanelType: string;
};

type ModalEndpoint = {
    modal: {
        modalWithTitleAndButtonRenderer: {
            title: Runs;
            content: Runs;
            button: {
                buttonRenderer: ButtonRenderer;
            };
        };
    };
};

type QueueAddEndpoint = {
    queueTarget: {
        videoId?: string;
        playlistId?: string;
        onEmptyQueue?: {
            watchEndpoint: WatchEndpoint;
        };
    };
    queueInsertPosition: string;
    commands: unknown[];
};

type NavigationEndpoint = {
    browseEndpoint?: BrowseEndpoint;
    watchEndpoint?: WatchEndpoint;
    watchPlaylistEndpoint?: WatchPlaylistEndpoint;
    shareEntityEndpoint?: ShareEntityEndpoint;
    modalEndpoint?: ModalEndpoint;
};

type ButtonRenderer = {
    style?: string;
    size?: string;
    isDisabled?: boolean;
    text?: Runs;
    icon?: Icon;
    command?: NavigationEndpoint;
    navigationEndpoint?: NavigationEndpoint;
};

type MenuItem = {
    menuNavigationItemRenderer?: {
        text: Runs;
        icon: Icon;
        navigationEndpoint: NavigationEndpoint;
    };
    menuServiceItemRenderer?: {
        text: Runs;
        icon: Icon;
        serviceEndpoint: {
            queueAddEndpoint?: QueueAddEndpoint;
        };
    };
    toggleMenuServiceItemRenderer?: {
        defaultText: Runs;
        defaultIcon: Icon;
        defaultServiceEndpoint: {
            modalEndpoint: ModalEndpoint;
        };
        toggledText: Runs;
        toggledIcon: Icon;
        toggledServiceEndpoint: {
            likeEndpoint: {
                status: string;
                target: {
                    videoId?: string;
                    playlistId?: string;
                };
            };
        };
        isToggled: boolean;
    };
    menuServiceItemDownloadRenderer?: {
        serviceEndpoint: {
            offlineVideoEndpoint: {
                videoId: string;
                onAddCommand: unknown;
            };
        };
        badgeIcon: Icon;
    };
};

type MenuRenderer = {
    menuRenderer: {
        items: MenuItem[];
        topLevelButtons?: {
            likeButtonRenderer: {
                target: {
                    videoId: string;
                };
                likeStatus: string;
                likesAllowed: boolean;
                dislikeNavigationEndpoint: NavigationEndpoint;
                likeCommand: NavigationEndpoint;
            };
        }[];
    };
};

type MusicPlayButtonRenderer = {
    playNavigationEndpoint: NavigationEndpoint;
    playIcon: Icon;
    pauseIcon: Icon;
    iconColor: number;
    backgroundColor: number;
    activeBackgroundColor: number;
    loadingIndicatorColor: number;
    playingIcon: Icon;
    iconLoadingColor: number;
    activeScaleFactor: number;
    buttonSize: string;
    rippleTarget: string;
};

type MusicItemThumbnailOverlayRenderer = {
    musicItemThumbnailOverlayRenderer: {
        background: {
            verticalGradient: {
                gradientLayerColors: string[];
            };
        };
        content: {
            musicPlayButtonRenderer: MusicPlayButtonRenderer;
        };
        contentPosition: string;
        displayStyle: string;
    };
};

type MusicInlineBadge = {
    musicInlineBadgeRenderer: {
        icon: Icon;
    };
};

type MusicResponsiveListItemRenderer = {
    thumbnail?: MusicThumbnailRenderer;
    overlay?: MusicItemThumbnailOverlayRenderer;
    flexColumns: {
        musicResponsiveListItemFlexColumnRenderer: {
            text: Partial<Runs>;
            displayPriority: string;
        };
    }[];
    fixedColumns?: {
        musicResponsiveListItemFixedColumnRenderer: {
            text: Partial<Runs>;
            displayPriority: string;
            size: string;
        };
    }[];
    menu?: MenuRenderer;
    playlistItemData?: {
        videoId: string;
        playlistSetVideoId?: string;
    };
    flexColumnDisplayStyle?: string;
    itemHeight?: string;
    navigationEndpoint?: NavigationEndpoint;
    badges?: MusicInlineBadge[];
};

type MusicTwoRowItemRenderer = {
    thumbnailRenderer: MusicThumbnailRenderer;
    aspectRatio: string;
    title: Runs;
    subtitle: Runs;
    navigationEndpoint: NavigationEndpoint;
    menu: MenuRenderer;
    thumbnailOverlay: MusicItemThumbnailOverlayRenderer;
    subtitleBadges?: MusicInlineBadge[];
};

type MusicShelfRenderer = {
    title?: Runs;
    contents: {
        musicResponsiveListItemRenderer: MusicResponsiveListItemRenderer;
    }[];
    bottomText?: Runs;
    bottomEndpoint?: NavigationEndpoint;
    shelfDivider?: {
        musicShelfDividerRenderer: {
            hidden: boolean;
        };
    };
    contentsMultiSelectable?: boolean;
};

type MusicCardShelfRenderer = {
    thumbnail: MusicThumbnailRenderer;
    title: Runs;
    subtitle: Runs;
    contents: {
        musicResponsiveListItemRenderer: MusicResponsiveListItemRenderer;
    }[];
    buttons: {
        buttonRenderer: ButtonRenderer;
    }[];
    menu: MenuRenderer;
    onTap: NavigationEndpoint;
    endIcon: Icon;
    subtitleBadges?: MusicInlineBadge[];
    thumbnailOverlay?: MusicItemThumbnailOverlayRenderer;
};

type MusicCarouselShelfRenderer = {
    header: {
        musicCarouselShelfBasicHeaderRenderer: {
            title: Runs;
            headerStyle: string;
            moreContentButton?: {
                buttonRenderer: ButtonRenderer;
            };
        };
    };
    contents: {
        musicTwoRowItemRenderer: MusicTwoRowItemRenderer;
    }[];
    itemSize: string;
};

type MusicDescriptionShelfRenderer = {
    header: Runs;
    subheader?: Runs;
    description: Runs;
    moreButton: {
        toggleButtonRenderer: ToggleButtonRenderer;
    };
};

type ToggleButtonRenderer = {
    isToggled: boolean;
    isDisabled: boolean;
    defaultIcon: Icon;
    defaultText: Runs;
    toggledIcon: Icon;
    toggledText: Runs;
};

type MicroformatDataRenderer = {
    urlCanonical: string;
    title: string;
    description: string;
    thumbnail: {
        thumbnails: Thumbnail[];
    };
    siteName: string;
    appName: string;
    androidPackage: string;
    iosAppStoreId: string;
    ogType: string;
    urlApplinksWeb: string;
    urlApplinksIos: string;
    urlApplinksAndroid: string;
    urlTwitterIos: string;
    urlTwitterAndroid: string;
    twitterCardType: string;
    twitterSiteHandle: string;
};

type Microformat = {
    microformatDataRenderer: MicroformatDataRenderer;
};

type AlbumHeaderRenderer = {
    thumbnail: MusicThumbnailRenderer;
    buttons: {
        toggleButtonRenderer?: ToggleButtonRenderer;
        musicPlayButtonRenderer?: MusicPlayButtonRenderer;
        menuRenderer?: MenuRenderer['menuRenderer'];
    }[];
    title: Runs;
    subtitle: Runs;
    straplineTextOne: Runs;
    straplineThumbnail: MusicThumbnailRenderer;
    subtitleBadge?: MusicInlineBadge[];
    description?: {
        musicDescriptionShelfRenderer: MusicDescriptionShelfRenderer;
    };
    secondSubtitle: Runs;
};

type ArtistHeaderRenderer = {
    title: Runs;
    subscriptionButton: {
        subscribeButtonRenderer: {
            subscriberCountText: Runs;
            subscribed: boolean;
            enabled: boolean;
            type: string;
            channelId: string;
            showPreferences: boolean;
            subscriberCountWithSubscribeText: Runs;
            subscribedButtonText: Runs;
            unsubscribedButtonText: Runs;
            unsubscribeButtonText: Runs;
            serviceEndpoints: unknown[];
            longSubscriberCountText: Runs;
            shortSubscriberCountText: Runs;
            signInEndpoint: NavigationEndpoint;
        };
    };
    description?: Runs;
    moreButton?: {
        toggleButtonRenderer: ToggleButtonRenderer;
    };
    menu: MenuRenderer;
    thumbnail: MusicThumbnailRenderer;
    playButton: {
        buttonRenderer: ButtonRenderer;
    };
    startRadioButton: {
        buttonRenderer: ButtonRenderer;
    };
    shareEndpoint: NavigationEndpoint;
    monthlyListenerCount?: Runs;
};

export type SearchSection = Partial<MusicCardShelfRenderer> & Partial<MusicShelfRenderer> & {
    itemSectionRenderer?: {
        contents: {
            musicResponsiveListItemRenderer: MusicResponsiveListItemRenderer;
        }[];
    };
};

export type SearchResponse = SearchSection[];

export interface AlbumResponse {
    contents: {
        twoColumnBrowseResultsRenderer: {
            tabs: {
                tabRenderer: {
                    content: {
                        sectionListRenderer: {
                            contents: {
                                musicResponsiveHeaderRenderer: AlbumHeaderRenderer;
                            }[];
                        };
                    };
                };
            }[];
            secondaryContents: {
                sectionListRenderer: {
                    contents: {
                        musicShelfRenderer: MusicShelfRenderer;
                    }[];
                };
            };
        };
    };
    microformat: Microformat;
    background: MusicThumbnailRenderer;
}

export interface ArtistResponse {
    contents: {
        singleColumnBrowseResultsRenderer: {
            tabs: {
                tabRenderer: {
                    endpoint: {
                        browseEndpoint: BrowseEndpoint;
                    };
                    title: string;
                    selected: boolean;
                    content: {
                        sectionListRenderer: {
                            contents: {
                                musicShelfRenderer?: MusicShelfRenderer;
                                musicCarouselShelfRenderer?: MusicCarouselShelfRenderer;
                                musicDescriptionShelfRenderer?: MusicDescriptionShelfRenderer;
                            }[];
                        };
                    };
                };
            }[];
        };
    };
    header: {
        musicImmersiveHeaderRenderer: ArtistHeaderRenderer;
    };
    microformat: Microformat;
}
