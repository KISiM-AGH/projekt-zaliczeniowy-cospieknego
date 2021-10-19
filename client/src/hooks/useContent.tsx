import { useState, useEffect } from 'react';

// : { [target: string]: []; }

export default function useContent(target: string): [] {
    const [content, setContent] = useState<[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response: Response = await fetch(
                `http://localhost:8080/api/v1/${target}`
            );

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            setContent(data);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return { [target]: content };
    return content;
}
