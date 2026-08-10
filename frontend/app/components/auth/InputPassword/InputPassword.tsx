'use client';

import { useState, useEffect, ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, EyeOffIcon } from '@hugeicons/core-free-icons';

import styles from './InputPassword.module.css';
import SlideUp from '../../animations/auth/SlideUp/SlideUp';

interface InputPasswordProps {
    setPasswordValue: React.Dispatch<React.SetStateAction<string | null>>;
    duration: string;
    labelText: string;
    showError: boolean;
    externalError?: boolean;
    children?: ReactNode;
}

export default function InputPassword({
        setPasswordValue,
        duration,
        labelText,
        showError,
        externalError=false,
        children=<></>
    }: InputPasswordProps) {

    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        if (password.length === 0) {
            setError(false);
            setPasswordValue(null);
        } else if (password.length <= 7) {
            setError(true);
            setPasswordValue(null)
        } else {
            setError(false);
            setPasswordValue(password);
        }
    }, [password]);

    return (
        <div className={styles.group}>
            <div className={styles.label}>{labelText}</div>
            <SlideUp duration={duration}>
                <div className={styles.wrapper}>
                    <input
                        type={
                            isToggled
                            ? 'text'
                            : 'password'
                        }
                        placeholder='qwerty123'
                        className={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.toggleWrapper}>
                        <button
                            className={styles.toggle}
                            onClick={() => setIsToggled(!isToggled)}
                        >
                            {
                                isToggled
                                ? (
                                    <HugeiconsIcon
                                        icon={EyeOffIcon}
                                        size={24}
                                        strokeWidth={1.5}
                                        className={styles.toggleIcon}
                                    />
                                )
                                : (
                                    <HugeiconsIcon
                                        icon={ViewIcon}
                                        size={24}
                                        strokeWidth={1.5}
                                        className={styles.toggleIcon}
                                    />
                                )
                            }
                        </button>
                    </div>
                </div>
            </SlideUp>
            {
                error && showError && (
                    <div className={styles.error}>Ошибка: пароль не может быть короче 8 символов.</div>
                )
            }
            {
                externalError && (
                    <div className={styles.error}>{children}</div>
                )
            }
        </div>
    );
}