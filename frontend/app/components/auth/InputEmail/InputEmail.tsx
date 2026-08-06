'use client';

import styles from './InputEmail.module.css';
import { useState, useEffect } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface InputEmailProp {
    setEmailValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function InputEmail({setEmailValue}: InputEmailProp) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (emailRegex.test(email)) {
            setEmailValue(email);
            setError(false);
        } else if (email === '') {
            setEmailValue(null);
            setError(false);
        } else {
            setEmailValue(null);
            setError(true);
        }
    }, [email]);

    return (
        <div className={styles.group}>
            <div className={styles.label}>Введите почту:</div>
            <input
                type='email'
                placeholder='pochta@email.ru'
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
            />
            {
                error &&
                <div className={styles.error}>Ошибка: введена некорректная почта.</div>
            }
        </div>
    );
}