import { useState, useEffect } from 'react';
import useAuth from './useAuth';

export default function useContent(target: string, method?: string): [] {
    const [content, setContent] = useState<[]>([]);
    const { currentUser, isLoggedIn } = useAuth();

    useEffect(() => {
        let abortController = new AbortController();
        let aborted = abortController.signal.aborted;

        async function fetchData() {
            const options: RequestInit = {
                headers: authHeader() as HeadersInit,
                method,
            };
            const response: Response = await fetch(
                `http://localhost:8080/api/v1/${target}`,
                options
            );

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            aborted === false && setContent(data);
        }

        fetchData();
        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authHeader = () => {
        if (isLoggedIn) {
            return { Authorization: `Bearer ${currentUser?.token}` };
        }
        return {};
    };

    return content;
}
