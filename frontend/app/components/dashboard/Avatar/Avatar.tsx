import styles from './Avatar.module.css';

export default function Avatar() {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.avatar} ${styles.grey1}`}>Н</div>
        </div>
    );
}