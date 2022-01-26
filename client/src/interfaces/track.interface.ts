import IAlbum from './album.interface';
import IArtist from './artist.interface';

export default interface ITrack extends IArtist, IAlbum {
    id: string;
    name: string;
    type: string;
    track_number: number;
    popularity: number;
    duration: number;
    explicit: boolean;
    album: IAlbum;
    artists: IArtist[];
}
