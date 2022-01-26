type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> &
        Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

interface IDataset {
    albums?: [];
    playlists?: [];
    podcasts?: [];
    artists?: [];
    genres?: [];
}

export default function selectionFilter({
    albums,
    playlists,
    podcasts,
    artists,
    genres,
}: RequireAtLeastOne<IDataset>) {
    return {
        albums: [
            {
                title: 'Albumy',
                data: albums,
            },
        ],
        playlists: [
            {
                title: 'Playlisty',
                data: playlists,
            },
        ],
        podcasts: [
            {
                title: 'Podcasty',
                data: podcasts,
            },
        ],
        artists: [
            {
                title: 'Wykonawcy',
                data: artists,
            },
        ],
        genres: [
            {
                title: 'Przeglądaj wszystko',
                data: genres,
            },
        ],
    };
}
