import React from 'react';
import { NavLink} from 'react-router-dom';
import styles from './Header.module.scss';

export function LinkMenu({url,title,icon}) {
    
    return (
        <NavLink to={url} 
            className={styles.link}>
            {icon}
            <span>{title}</span>
        </NavLink>
    );
}