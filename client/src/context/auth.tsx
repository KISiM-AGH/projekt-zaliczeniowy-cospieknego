import {
    useEffect,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    useReducer,
} from 'react';
import { AuthReducer } from '../reducers/auth';
import { authorize } from './authActions';

interface IProps {
    children: ReactNode;
}

export interface AuthState {
    currentUser: {};
    isLoggedIn: boolean;
    loading: boolean;
    errors: [];
    dispatch: Dispatch<SetStateAction<AuthState>>;
}

const user: any = JSON.parse(localStorage.getItem('authUser') || '{}');

const initialState: AuthState = {
    currentUser: user,
    isLoggedIn: false,
    loading: false,
    errors: [],
    dispatch: (): void => {
        throw new Error('Dispatch function must be overridden');
    },
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: IProps) => {
    const [authState, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        user?.token && authorize(dispatch, user.token);
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
