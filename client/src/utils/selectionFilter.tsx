interface IProps {
    albums: [];
    playlists: [];
    podcasts: [];
    artists: [];
}

export default function selectionFilter({
    albums,
    playlists,
    podcasts,
    artists,
}: IProps) {
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
    };
}
