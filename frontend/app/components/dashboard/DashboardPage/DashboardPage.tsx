import { ReactNode } from 'react';
import styles from './DashboardPage.module.css';

interface DashboardPageProps {
    title: string;
    children: ReactNode;
}

export default function DashboardPage({title, children}: DashboardPageProps) {
    return (
        <div className={styles.page}>
            <div className={styles.title}>{title}</div>
            {children}
        </div>
    );
}