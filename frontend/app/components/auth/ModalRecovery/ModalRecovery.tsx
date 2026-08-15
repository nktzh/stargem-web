'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

import styles from './ModalRecovery.module.css';

import InputEmail from '../InputEmail/InputEmail';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import PopUp from '../PopUp/PopUp';

interface ModalRecoveryProp {
    close: () => void;
}

export default function ModalRecovery({close}: ModalRecoveryProp) {
    const [email, setEmail] = useState<string | null>(null);

    const [popUp, setPopUp] = useState(
        {
            show: false,
            success: false,
            text:
            <>
                Ошибка: аккаунт с данной почтой не найден.
            </>,
            showClose: true
        }
    );

    function sendRecoveryLink() {
        setPopUp(prev => ({
            ...prev,
            show: true
        }));
    }

    function closePopUp() {
        setPopUp(prev => ({
            ...prev,
            show: false
        }));
    }

    return createPortal(
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        Восстановление<br />
                        учетной записи
                    </div>
                    <button
                        className={styles.close}
                        onClick={() => close()}
                    >
                        <HugeiconsIcon
                            icon={Cancel01Icon}
                            strokeWidth={1.5}
                            className={styles.icon}
                        />
                    </button>
                </div>
                <InputEmail
                    setEmailValue={setEmail}
                    duration='0.1s'
                />
                <ButtonSubmit
                    disabled={
                        email
                        ? false
                        : true
                    }
                    text='Получить ссылку на почту'
                    duration='0.2s'
                    onclick={() => sendRecoveryLink()}
                />
                {
                    popUp.show && (
                        <PopUp
                            success={popUp.success}
                            text={popUp.text}
                            showClose={popUp.showClose}
                            close={closePopUp}
                        />
                    )
                }
            </div>
        </div>,
        document.getElementById('modalContainer')!
    );
}