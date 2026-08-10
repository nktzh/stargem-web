'use client';

import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckIcon } from '@hugeicons/core-free-icons';
import styles from './PrivacyPolicy.module.css';

interface PrivacyPolicyProp {
    setPrivacyPolicyValue: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function PrivacyPolicy({setPrivacyPolicyValue}: PrivacyPolicyProp) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            setPrivacyPolicyValue(true);
        } else {
            setPrivacyPolicyValue(null);
        }
    }, [checked]);

    return (
        <div className={styles.group}>
            <button
                className={`
                    ${styles.checkbox}
                    ${checked
                        ? styles.checked
                        : styles.unchecked
                    }
                `}
                onClick={() => setChecked(!checked)}
            >
                {
                    checked && (
                        <HugeiconsIcon
                            icon={CheckIcon}
                            strokeWidth={1.5}
                            className={styles.icon}
                        />
                    )
                }
            </button>
            <div className={styles.text}>
                Я согласен(на) на обработку<br />
                персональных данных в соответствии<br />
                с <a href="/" className={styles.link}>Политикой конфиденциальности</a>.
            </div>
        </div>
    );
}