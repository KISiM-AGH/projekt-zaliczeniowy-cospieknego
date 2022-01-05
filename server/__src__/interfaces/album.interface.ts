import { RowDataPacket } from 'mysql2';

export default interface IAlbum extends RowDataPacket {
    id: number;
    name: string;
    year: number;
    slug: string;
    artist_id: number;
}
