import IImage from './image.interface';
import ITrack from './track.interface';

export default interface IPlaylist extends ITrack {
    id: string;
    name: string;
    description: string;
    images: IImage[];
    tracks: ITrack[];
}
