import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
    id: number;
    email: string;
    password: string;
    username: string;
    image_url: string;
    role?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
    currentUser: IUser;
}
