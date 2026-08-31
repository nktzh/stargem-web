import { useEffect, useState } from 'react';
import styles from './ButtonSend.module.css';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

export default function ButtonSend() {
    const [disabled, setDisabled] = useState(true);
    const [text, setText] = useState('');
    const [timer, setTimer] = useState(20);
    const [attempts, setAttempts] = useState(1);
    const [status, setStatus] = useState(
        {
            show: false,
            success: true,
            text: 'Ссылка была успешна отправлена на Вашу эл. почту'
        }
    );

    function sendMagicLink() {
        setAttempts(prev => prev + 1);
        if (attempts % 2 === 0) {
            setTimer(120);
        } else {
            setTimer(20);
        }

        setDisabled(true);
        setStatus(prev => ({
            ...prev,
            show: true
        }));
    }

    useEffect(() => {
        if (timer <= 0) {
            setDisabled(false);
            setStatus(prev => ({
                ...prev,
                show: false
            }));
            setText('Отправить новую ссылку');
        } else {
            setText(`Отправить новую ссылку (${timer} сек.)`);
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className={styles.group}>
            <ButtonSubmit
                disabled={disabled}
                text={text}
                duration='0'
                onclick={sendMagicLink}
            />
            {
                status.show && (
                    <div className={styles.success}>{status.text}</div>
                )
            }
        </div>   
    )
}