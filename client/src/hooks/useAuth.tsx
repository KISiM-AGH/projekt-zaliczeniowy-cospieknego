import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';

interface IStoredUsed {
    id: string;
    email: string;
    image_url: string;
    username: string;
    role: string;
    token: string;
}

export default function useAuth() {
    const [user, setUser] = useState<IStoredUsed | {}>(
        JSON.parse(localStorage.getItem('authUser') || '{}')
    );

    useEffect(() => {
        // login();
        // const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        // auth(authUser.token);
    }, []);

    const auth = async (token: string) => {
        const response = await fetch('http://localhost:8080/api/v1/auth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const currentUser = await response.json();
        console.log(user);
        setUser(currentUser);
    };

    const login = async () => {
        // TEST
        const response = await fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@gmail.com',
                password: '1234',
            }),
        });
        const authUser = await response.json();
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(user);
    };

    return user;
}
