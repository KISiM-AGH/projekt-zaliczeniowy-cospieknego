import { Dispatch, SetStateAction, useContext } from 'react';
import { AuthContext, AuthState } from '../context/auth';

interface IUser {
    id: string;
    email: string;
    username: string;
    token: string;
    role?: string;
    image_url?: string;
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
