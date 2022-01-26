import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
    id: string;
    email: string;
    password: string;
    username: string;
    birth_date: string;
    signup_date: string;
    gender: string;
    images?: {
        url: string;
        width: number;
        height: number;
    };
    send_newsletter?: boolean;
    product?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
    currentUser: IUser;
}
