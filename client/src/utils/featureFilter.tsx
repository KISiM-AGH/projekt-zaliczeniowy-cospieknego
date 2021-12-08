interface IProps {
    songs: [];
    albums?: [];
    artists?: [];
    featured?: [];
}

export default function featureFilter({ songs, albums, artists }: IProps) {
    return [
        {
            title: 'Ostatnio odtwarzane',
            data: songs,
        },
        {
            title: 'Polecane dziś dla Ciebie',
            data: albums,
        },
        {
            title: 'Na podstawie ostatnich odtworzeń',
            data: artists,
        },
    ];
}
