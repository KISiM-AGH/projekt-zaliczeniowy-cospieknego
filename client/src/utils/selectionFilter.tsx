interface IProps {
    songs: [];
    albums?: [];
    artists?: [];
    featured?: [];
}

export default function selectionFilter({
    songs,
    albums,
    artists,
    featured,
}: IProps) {
    return {
        songs: [
            {
                title: 'Polecane utwory',
                data: songs,
            },
            {
                title: 'Ostatnio odtwarzane',
                data: songs,
            },
        ],
        albums: [
            {
                title: 'Albumy',
                data: albums,
            },
        ],
        artists: [
            {
                title: 'Wykonawcy',
                data: artists,
            },
        ],
        featured: [
            {
                title: 'Warte uwagi',
                data: featured,
            },
        ],
    };
}
