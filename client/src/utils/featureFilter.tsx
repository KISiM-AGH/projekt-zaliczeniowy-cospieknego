import IAlbum from '../interfaces/album.interface';
import IArtist from '../interfaces/artist.interface';
import ITrack from '../interfaces/track.interface';

interface IProps {
    tracks: ITrack[];
    albums?: IAlbum[];
    artists?: IArtist[];
}

export default function featureFilter({ tracks, albums, artists }: IProps) {
    return [
        {
            title: 'Polecane dziś dla Ciebie',
            data: albums,
        },
        {
            title: 'Na podstawie ostatnich odtworzeń',
            data: artists,
        },
        {
            title: 'Playlisty nie do przegapienia',
            data: tracks,
        },
    ];
}
