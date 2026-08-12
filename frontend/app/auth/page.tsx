'use client';

import { useState, useEffect } from 'react';

import styles from './Auth.module.css';

import InputEmail from '../components/auth/InputEmail/InputEmail';
import InputPassword from '../components/auth/InputPassword/InputPassword';
import ButtonSubmit from '../components/auth/ButtonSubmit/ButtonSubmit';
import InputComfirmedPassword from '../components/auth/InputComfirmedPassword/InputComfirmedPassword';
import InputName from '../components/auth/InputName/InputName';
import PrivacyPolicy from '../components/auth/PrivacyPolicy/PrivacyPolicy';

import SlideUp from '../components/animations/auth/SlideUp/SlideUp';

import ModalRecovery from '../components/auth/ModalRecovery/ModalRecovery';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [disabledStatus, setDisabledStatus] = useState(true);

    const [emailValue, setEmailValue] = useState<string | null>(null);
    const [passwordValue, setPasswordValue] = useState<string | null>(null);

    const [nameValue, setNameValue] = useState<string | null>(null);
    const [comfirmedPasswordValue, setComfirmedPasswordValue] = useState<string | null>(null);
    const [privacyPolicyValue, setPrivacyPolicyValue] = useState<boolean | null>(null);

    const [recoveryModal, setRecoveryModal] = useState(false);

    function close() {
        setRecoveryModal(false);
    }

    useEffect(() => {
        setDisabledStatus(true);
    }, [isLogin]);

    useEffect(() => {
        if (isLogin && emailValue && passwordValue) {
            setDisabledStatus(false);
        } else {
            setDisabledStatus(true);
        }
    }, [
        isLogin,
        emailValue,
        passwordValue
    ]);

    useEffect(() => {
        if (
            !isLogin
            && nameValue
            && emailValue
            && comfirmedPasswordValue
            && privacyPolicyValue
        ) {
            setDisabledStatus(false);
        } else {
            setDisabledStatus(true);
        }
    }, [
        isLogin,
        nameValue,
        emailValue,
        comfirmedPasswordValue,
        privacyPolicyValue
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <img
                    src='/logo.svg'
                    alt='Логотип Stargem'
                    title='Где мысли превращаются в код.'
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
                                    duration='0.1s'
                                >
                                    {isLogin ? 'Рады видеть Вас снова.' : 'Добро пожаловать в Stargem!'}
                                </SlideUp>
                            </div>
                        </div>
                        {
                            !isLogin && (
                                <InputName
                                    duration='0.2s'
                                    setNameValue={setNameValue}
                                />
                            )
                        }
                        <InputEmail
                            setEmailValue={setEmailValue}
                            duration='0.2s'
                        />
                        {
                            isLogin
                            ? (
                                <InputPassword
                                    setPasswordValue={setPasswordValue}
                                    duration='0.3s'
                                    labelText='Введите пароль:'
                                    showError={true}
                                />
                            )
                            : (
                                <InputComfirmedPassword setComfirmedPassword={setComfirmedPasswordValue}/>
                            )
                        }
                        {
                            isLogin && (
                                <div className={styles.passwordRecoveryWrapper}>
                                    <div
                                        className={styles.passwordRecovery}
                                        onClick={() => setRecoveryModal(!recoveryModal)}
                                    >
                                    Забыли пароль?
                                    </div>
                                </div>
                            )
                        }
                        {
                            recoveryModal && (
                                <ModalRecovery close={close}/>
                            )
                        }
                        {
                            !isLogin && (
                                <PrivacyPolicy setPrivacyPolicyValue={setPrivacyPolicyValue}/>
                            )
                        }
                        <ButtonSubmit
                            disabled={disabledStatus}
                            text={
                                isLogin
                                ? 'Войти'
                                : 'Зарегистрироваться'
                            }
                            duration='0.4s'
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