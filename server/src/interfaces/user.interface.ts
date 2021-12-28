import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
    id: number;
    email: string;
    confirmEmail: string;
    password: string;
    username: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    gender: string;
    isSubscribedToNewsletter: boolean;
    hasAcceptedTos: boolean;
    image_url?: string;
    role?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
    currentUser: IUser;
}
