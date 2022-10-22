import React from 'react';
import styles from './Input.module.scss';

export function Input({label,idName,type,state,setState}) {
    return (
        <div className={styles.boxInput}>
            <label htmlFor={idName}>{label}</label>
            <input
            id={idName} 
            name={idName} 
            type={type}
            value={state} 
            onChange={e => setState(e.target.value)} />
        </div>
    );
}