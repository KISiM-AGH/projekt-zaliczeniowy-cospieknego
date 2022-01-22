import IImage from './image.interface';
import ITrack from './track.interface';

export default interface IPlaylist {
    id: string;
    name: string;
    type: {
        type: string;
        default: 'playlist';
    };
    public: boolean;
    description: string;
    owner: {
        username: string;
    };
    images: IImage[];
    collaborative?: boolean;
    tracks?: ITrack[];
}
