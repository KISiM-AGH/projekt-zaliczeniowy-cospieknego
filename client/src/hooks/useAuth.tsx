import { Dispatch, SetStateAction, useContext } from 'react';
import { AuthContext, AuthState } from '../context/authContext';

interface IUser {
    id: string;
    email: string;
    username: string;
    token: string;
    images?: [
        {
            url: string;
            width: number;
            height: number;
        }
    ];
}

interface IAuthState {
    currentUser?: IUser;
    isLoggedIn: boolean;
    loading: boolean;
    errors: [];
    dispatch: Dispatch<SetStateAction<AuthState>>;
}

export default function useAuthState(): IAuthState {
    return useContext(AuthContext);
}
