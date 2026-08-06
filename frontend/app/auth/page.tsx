'use client';

import styles from './Auth.module.css';
import InputEmail from '../components/auth/InputEmail/InputEmail';
import InputPassword from '../components/auth/InputPassword/InputPassword';
import { useState, useEffect } from 'react';

export default function Auth() {
    const [emailValue, setEmailValue] = useState<string | null>(null);
    const [passwordValue, setPasswordValue] = useState<string | null>(null);

    /*
    useEffect(() => {
        console.log(`${emailValue} ${passwordValue}`);
    }, [emailValue, passwordValue]);
    */

    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <img
                    src='/logo.svg'
                    alt='Логотип Stargem'
                    className={styles.logo}
                />
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <div className={styles.header}>
                            <div className={styles.title}>Вход</div>
                            <div className={styles.caption}>Рады видеть Вас снова.</div>
                        </div>
                        <InputEmail setEmailValue={setEmailValue} />
                        <InputPassword setPasswordValue={setPasswordValue} />
                    </div>
                    <div className={styles.toggleText}>
                        Нет аккаунта?
                        <span className={styles.toggle}>Зарегистрируйтесь</span>
                    </div>
                </div>
            </div>
        </div>
    );
}