import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

interface IProps {
    children: ReactNode;
}

interface Context {
    isLoggedIn: boolean;
    // user: {};
    setContext: Dispatch<SetStateAction<Context>>;
}

const initialContext: Context = {
    isLoggedIn: false,
    // user: {},
    setContext: (): void => {
        throw new Error('setContext function must be overridden');
    },
};

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext<Context>(initialContext);

export const AuthProvider = ({ children }: IProps) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        ...JSON.parse(localStorage.getItem('authUser') || '{}'),
    });

    useEffect(() => {
        const auth = async (token: string) => {
            const response = await fetch('http://localhost:8080/api/v1/auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const currentUser = await response.json();
            currentUser && setUser(currentUser);
            if (currentUser) {
                setUser(currentUser);
            }
        };
        Object.keys(user).length !== 0 && auth(user.token);
    }, []);

    const login = () => {
        //
    };

    return (
        <AuthContext.Provider value={{ ...user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
