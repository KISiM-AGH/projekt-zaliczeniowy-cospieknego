import IImage from './image.interface';

export default interface IArtist {
    id: string;
    name: string;
    type: string;
    popularity: number;
    followers: {
        total: number;
    };
    genres: string[];
    images: IImage[];
}
