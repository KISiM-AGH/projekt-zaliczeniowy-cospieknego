import { useState, useEffect } from 'react';

export default function useContent(target: string): [] {
    const [content, setContent] = useState<[]>([]);

    useEffect(() => {
        let abortController = new AbortController();
        let aborted = abortController.signal.aborted;

        async function fetchData() {
            const response: Response = await fetch(
                `http://localhost:8080/api/v1/${target}`
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

    return content;
}
