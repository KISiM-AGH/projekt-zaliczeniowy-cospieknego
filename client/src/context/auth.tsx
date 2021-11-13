import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    useReducer,
} from 'react';
import { AuthReducer } from '../reducers/auth';
import { authorize, login } from './authActions';

interface IProps {
    children: ReactNode;
}

export interface AuthState {
    currentUser: {};
    isLoggedIn: boolean;
    loading: boolean;
    errorMessage: string | null;
    dispatch: Dispatch<SetStateAction<AuthState>>;
}

const user: any = JSON.parse(localStorage.getItem('authUser') || '{}');

const initialState: AuthState = {
    currentUser: user,
    isLoggedIn: false,
    errorMessage: null,
    loading: false,
    dispatch: (): void => {
        throw new Error('Dispatch function must be overridden');
    },
};

export const AuthContext = createContext(initialState);

export const useAuthState = () => useContext(AuthContext);

export const AuthProvider = ({ children }: IProps) => {
    const [authState, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        //login(dispatch);
        user?.token && authorize(dispatch, user.token);
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
