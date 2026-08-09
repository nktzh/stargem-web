'use client';

import styles from './ButtonSubmit.module.css';
import SlideUp from '../../animations/auth/SlideUp/SlideUp';
import { useState } from 'react';

interface ButtonSubmitProps {
    disabled: boolean;
    text: string;
    duration: string;
}

export default function ButtonSubmit({disabled, text, duration}: ButtonSubmitProps) {
    const [error, setError] = useState(false);

    return (
        <div className={styles.group}>
            <SlideUp duration={duration}>
                <button
                    className={`
                        ${styles.submit} 
                        ${disabled && (
                            styles.disabled
                        )}
                    `}
                >{text}</button>
            </SlideUp>
            {
                error && (
                    <div className={styles.error}>Произошла ошибка при входе, обратитесь в поддержку.</div>
                )
            }
        </div>
    );
}