import {
    useEffect,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    useReducer,
} from 'react';
import { AuthReducer } from '../reducers/authReducer';
import { authorize } from '../actions/authActions';
import * as ACTIONS from '../constants/actions';

interface IProps {
    children: ReactNode;
}

interface IUser {
    id: string;
    email: string;
    username: string;
    token: string;
    role?: string;
    image_url?: string;
}

export interface AuthState {
    currentUser: IUser;
    isLoggedIn: boolean;
    loading: boolean;
    errors: [];
    dispatch: Dispatch<SetStateAction<AuthState>>;
}

const user: any = JSON.parse(localStorage.getItem('authUser') || '{}');

const initialState: AuthState = {
    currentUser: user,
    isLoggedIn: false,
    loading: true,
    errors: [],
    dispatch: (): void => {
        throw new Error('Dispatch function must be overridden');
    },
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: IProps) => {
    const [authState, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        user?.token
            ? authorize(dispatch, user.token)
            : dispatch({ type: ACTIONS.VERIFY_FAILED });
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
