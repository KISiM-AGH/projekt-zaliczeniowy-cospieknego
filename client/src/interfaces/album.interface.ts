import IImage from './image.interface';
import ITrack from './track.interface';
import IArtist from './artist.interface';

export default interface IAlbum {
    id: string;
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    album_type: string;
    total_tracks: number;
    artists: IArtist[];
    images: IImage[];
    tracks: ITrack[];
}
