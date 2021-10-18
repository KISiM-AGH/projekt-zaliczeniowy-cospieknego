import { useState, useEffect } from 'react';

interface WindowDimensions {
    x: number;
    y: number;
}

export default function useWindowSize(): WindowDimensions {
    const [windowSize, setWindowSize] = useState<WindowDimensions>({
        x: window.innerWidth,
        y: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                x: window.innerWidth,
                y: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
