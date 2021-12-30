import { RowDataPacket } from 'mysql2';

export default interface IGenre extends RowDataPacket {
    id: number;
    email: string;
    confirmEmail: string;
    theme: string;
}
