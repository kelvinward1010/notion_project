import { Outlet } from 'react-router-dom';
import styles from './style.module.scss';
import { Navigation } from './navigation/Navigation';

export function Layout() {
    return (
        <div className={styles.container}>
            <Navigation />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}