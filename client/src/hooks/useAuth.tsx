import { useState, useEffect } from 'react';

export default function useAuth() {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@gmail.com',
                password: '1234',
            }),
        })
            .then((res) => res.json())
            .then((user) => setUser(user));
    }, []);

    return user;
}
