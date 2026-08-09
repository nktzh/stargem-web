'use client';

import styles from './Auth.module.css';
import InputEmail from '../components/auth/InputEmail/InputEmail';
import InputPassword from '../components/auth/InputPassword/InputPassword';
import ButtonSubmit from '../components/auth/ButtonSubmit/ButtonSubmit';
import SlideUp from '../components/animations/auth/SlideUp/SlideUp';
import { useState, useEffect } from 'react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [emailValue, setEmailValue] = useState<string | null>(null);
    const [passwordValue, setPasswordValue] = useState<string | null>(null);
    const [disabledStatus, setDisabledStatus] = useState(true);

    useEffect(() => {
        if (emailValue && passwordValue) {
            setDisabledStatus(false);
        } else {
            setDisabledStatus(true);
        }
    }, [emailValue, passwordValue]);

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
                            <div className={styles.title}>
                                {
                                    isLogin
                                    ? 'Вход'
                                    : 'Регистрация'
                                }
                            </div>
                            <div className={styles.caption}>
                                <SlideUp
                                    key={isLogin ? 'login' : 'register'}
                                    duration='0.2s'
                                >
                                    {isLogin ? 'Рады видеть Вас снова.' : 'Добро пожаловать в Stargem!'}
                                </SlideUp>
                            </div>
                        </div>
                        <InputEmail
                            setEmailValue={setEmailValue}
                            duration='0.4s'
                        />
                        <InputPassword
                            setPasswordValue={setPasswordValue}
                            duration='0.6s'
                        />
                        <ButtonSubmit
                            disabled={disabledStatus}
                            text={
                                isLogin
                                ? 'Войти'
                                : 'Зарегистрироваться'
                            }
                            duration='0.8s'
                        />
                    </div>
                    <div className={styles.toggleText}>
                        {
                            isLogin
                            ? 'Нет аккаунта?'
                            : 'Уже есть аккаунт?'
                        }
                        <span
                            className={styles.toggle}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {
                                isLogin
                                ? 'Зарегистрируйтесь'
                                : 'Вход здесь'
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}