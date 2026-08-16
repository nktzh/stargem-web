import { HugeiconsIcon } from '@hugeicons/react';
import { Logout02Icon } from '@hugeicons/core-free-icons';
import styles from './ButtonLogOut.module.css';

interface ButtonLogOutProps {
    onclick: () => void;
}

export default function ButtonLogOut({onclick}: ButtonLogOutProps) {
    return (
        <button
            className={styles.logout}
            onClick={() => onclick()}
        >
            <div className={styles.icon}>
                <HugeiconsIcon
                    icon={Logout02Icon}
                    size={24}
                    color='#FF2C2C'
                    strokeWidth={1.5}
                />
            </div>
            <div className={styles.label}>Выйти из уч. записи</div>
        </button>
    );
}