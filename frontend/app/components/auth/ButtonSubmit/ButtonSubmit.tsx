'use client';

import styles from './ButtonSubmit.module.css';
import SlideUp from '../../animations/auth/SlideUp/SlideUp';

interface ButtonSubmitProps {
    disabled: boolean;
    text: string;
    duration: string;
    onclick: () => void;
}

export default function ButtonSubmit({disabled, text, duration, onclick}: ButtonSubmitProps) {
    return (
        <div className={styles.group}>
            <SlideUp duration={duration}>
                <button
                    className={`
                        ${styles.submit} 
                        ${disabled && (
                            styles.disabled
                        )}
                    `}
                    disabled={disabled}
                    onClick={() => onclick()}
                >{text}</button>
            </SlideUp>
        </div>
    );
}