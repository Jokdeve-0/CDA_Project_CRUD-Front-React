import React from 'react';
import classnames from 'classnames';
import styles from './Title.module.scss';
export function H1({title}) {
    return (<>
        <h1 className={classnames(styles.title,styles.xl)}>{title}</h1>
    </>); 
}