import { RowDataPacket } from 'mysql2';

export default interface ISong extends RowDataPacket {
    id: number;
    title: string;
    duration: number;
    audio_url: string;
    lyrics?: string;
    artist_id: number;
    album_id?: number;
    is_explicit?: boolean;
}
