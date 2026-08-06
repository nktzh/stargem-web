'use client';

import styles from './ButtonSubmit.module.css';
import { useState } from 'react';

interface ButtonSubmitProps {
    disabled: boolean;
    text: string;
}

export default function ButtonSubmit({disabled, text}: ButtonSubmitProps) {
    const [error, setError] = useState(false);

    return (
        <div className={styles.group}>
            <button
                className={`
                    ${styles.submit} 
                    ${disabled && (
                        styles.disabled
                    )}
                `}
            >{text}</button>
            {
                error && (
                    <div className={styles.error}>Произошла ошибка при входе, обратитесь в поддержку.</div>
                )
            }
        </div>
    );
}