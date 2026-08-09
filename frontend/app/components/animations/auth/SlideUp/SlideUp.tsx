'use client';

import styles from './SlideUp.module.css';
import { ReactNode, useState, useEffect } from 'react';

interface SlideUpProps {
    duration: string;
    children: ReactNode;
}

export default function SlideUp({duration, children}: SlideUpProps) {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true);
    }, []);

    return (
        <div
            className={`${styles.wrapper} ${play ? styles.play : ''}`}
            style={{ animationDelay: duration }}
        >
            {children}
        </div>
    );
}