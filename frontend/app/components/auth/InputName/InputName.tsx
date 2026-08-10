'use client';

import { useState, useEffect } from 'react';
import styles from './InputName.module.css';
import SlideUp from '../../animations/auth/SlideUp/SlideUp';

interface InputNameProps {
    setNameValue: React.Dispatch<React.SetStateAction<string | null>>;
    duration: string;
}

export default function InputName({duration, setNameValue}: InputNameProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (name.length === 0) {
            setError(false);
            setNameValue(null);
        } else if (name.startsWith(' ')) {
            setError(true);
            setNameValue(null);
        } else {
            setError(false);
            setNameValue(name);
        }
    }, [name])

    return (
        <div className={styles.group}>
            <div className={styles.label}>Введите имя:</div>
            <SlideUp duration={duration}>
                <input
                    type='text'
                    placeholder='Никита'
                    className={styles.input}
                    onChange={(e) => setName(e.target.value)}
                />
            </SlideUp>
            {
                error && (
                    <div className={styles.error}>Ошибка: имя не должно начинаться с символа пробела.</div>
                )
            }
        </div>
    );
}