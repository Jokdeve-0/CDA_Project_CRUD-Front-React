import React from 'react';

import classnames from 'classnames';
import styles from './Title.module.scss';

export function H2({title}) {
    return (<>
        <h2 className={classnames(styles.title,styles.lg)}>{title}</h2>
    </>); 
}