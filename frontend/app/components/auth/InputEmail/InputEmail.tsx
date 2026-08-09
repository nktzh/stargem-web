'use client';

import styles from './InputEmail.module.css';
import SlideUp from '../../animations/auth/SlideUp/SlideUp';
import { useState, useEffect } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface InputEmailProps {
    setEmailValue: React.Dispatch<React.SetStateAction<string | null>>;
    duration: string;
}

export default function InputEmail({setEmailValue, duration}: InputEmailProps) {
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
            <SlideUp duration={duration}>
                <input
                    type='email'
                    placeholder='pochta@email.ru'
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </SlideUp>
            {
                error &&
                <div className={styles.error}>Ошибка: введена некорректная почта.</div>
            }
        </div>
    );
}