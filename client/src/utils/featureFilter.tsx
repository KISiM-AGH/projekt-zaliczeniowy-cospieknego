interface IProps {
    tracks: [];
    albums?: [];
    artists?: [];
    featured?: [];
}

export default function featureFilter({ tracks, albums, artists }: IProps) {
    return [
        {
            title: 'Ostatnio odtwarzane',
            data: tracks,
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
