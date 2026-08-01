import styles from './Home.module.css';

export default function Home() {
	return (
		<div className={styles.wrapper}>
			<img src='logo.svg' alt='Project logo' className={styles.logo} />
		</div>
	);
}