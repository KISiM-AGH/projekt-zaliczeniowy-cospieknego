import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
    id: number;
    email: string;
    password_digest: string;
    username: string;
    birth_date: string;
    gender: string;
    send_newsletter: boolean;
    image_url?: string;
    role?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
    currentUser: IUser;
}
