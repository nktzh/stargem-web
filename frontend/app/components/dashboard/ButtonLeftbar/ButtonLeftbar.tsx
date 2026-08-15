import styles from './ButtonLeftbar.module.css';
import { ReactNode } from 'react';

interface ButtonLeftbarProps {
    children: ReactNode;
    label: string;
    active: boolean;
    setpage: (label: string) => void;
}

export default function ButtonLeftbar({children, label, active, setpage}: ButtonLeftbarProps) {
    return (
        <button
            className={`
                ${styles.button}
                ${active
                ? styles.active
                : styles.inactive
                }
            `}
            onClick={() => setpage(label)}
        >
            <div className={styles.icon}>
                {children}
            </div>
            <div className={styles.label}>
                {label}
            </div>
        </button>
    );
}