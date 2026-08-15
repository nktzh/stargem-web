'use client';

import { createPortal } from 'react-dom';
import { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, CancelCircleIcon } from '@hugeicons/core-free-icons';
import styles from './PopUp.module.css';

interface PopUpProps {
    success: boolean;
    text: ReactNode;
    showClose: boolean;
    close: (() => void);
}

export default function PopUp({success, text, showClose, close}: PopUpProps) {
    return createPortal(
        <div className={styles.wrapper}>
            <div className={styles.popup}>
                <div className={styles.iconWrapper}>
                    {
                        success
                        ? (
                            <HugeiconsIcon
                                icon={CheckmarkCircle02Icon}
                                strokeWidth={1.5}
                                className={`${styles.icon} ${styles.success}`}
                            />
                        )
                        : (
                            <HugeiconsIcon
                                icon={CancelCircleIcon}
                                strokeWidth={1.5}
                                className={`${styles.icon} ${styles.error}`}
                            />
                        )
                    }
                </div>
                <div className={styles.text}>
                    {text}
                </div>
                {
                    showClose && (
                        <button
                            onClick={() => close()}
                            className={styles.retry}
                        >Попробовать еще раз</button>
                    )
                }
            </div>
        </div>,
        document.getElementById('popUpContainer')!
    );
}