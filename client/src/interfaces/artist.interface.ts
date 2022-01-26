import IImage from './image.interface';

export default interface IArtist {
    id: string;
    name: string;
    type: string;
    popularity?: number;
    images: IImage[];
    genres?: string[];
    followers?: {
        total: number;
    };
}
