'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

import styles from './ModalRecovery.module.css';

import InputEmail from '../InputEmail/InputEmail';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

interface ModalProp {
    close: () => void;
}

export default function Modal({close}: ModalProp) {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        console.log(email);
    }, [])

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
                />
            </div>
        </div>,
        document.getElementById('modalContainer')!
    );
}