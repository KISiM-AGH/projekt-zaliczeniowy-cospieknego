import ITrack from '../interfaces/track.interface';
import IAlbum from '../interfaces/album.interface';
import IArtist from '../interfaces/artist.interface';
import IPlaylist from '../interfaces/playlist.interface';

interface IProps {
    tracks: ITrack[];
    albums?: IAlbum[];
    artists?: IArtist[];
    playlists?: IPlaylist[];
}

export default function featureFilter({
    tracks,
    albums,
    artists,
    playlists,
}: IProps) {
    return [
        {
            title: 'Playlisty nie do przegapienia',
            type: 'playlists',
            data: playlists,
        },
        {
            title: 'Na topie',
            type: 'tracks',
            data: tracks,
        },
        {
            title: 'Dostępne albumy',
            type: 'albums',
            data: albums,
        },
        {
            title: 'Polecani wykonawcy',
            type: 'artists',
            data: artists,
        },
    ];
}
