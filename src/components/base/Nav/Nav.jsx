import React from 'react';
import styles from './Nav.module.scss';

export function Nav({children}) {
    return (
        <nav className={styles.nav}>
            {children}
        </nav>
    );
}