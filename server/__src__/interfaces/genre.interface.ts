import { RowDataPacket } from 'mysql2';

export default interface IGenre extends RowDataPacket {
    id: number;
    name: string;
    slug: string;
    theme_color: string;
}
