'use client';

import { ReactNode, useState, useEffect } from 'react';
import styles from './SlideUp.module.css';

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