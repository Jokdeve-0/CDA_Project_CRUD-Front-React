import React from 'react';
import { NavLink} from 'react-router-dom';
import styles from './Header.module.scss';

export function LinkMenu({url,title,icon,onclick}) {
    
    return (
        <NavLink to={url} onClick={onclick}
            className={styles.link}>
            {icon}
            <span>{title}</span>
        </NavLink>
    );
}