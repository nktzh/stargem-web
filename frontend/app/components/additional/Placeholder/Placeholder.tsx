import styles from './Placeholder.module.css';

export default function Placeholder() {
    return (
        <div className={styles.wrapper}>
			<img src='logo.svg' alt='Project logo' className={styles.logo} />
		</div>
    );
}