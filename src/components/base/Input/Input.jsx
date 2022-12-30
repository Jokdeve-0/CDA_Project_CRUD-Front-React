import React from 'react';
import styles from './Input.module.scss';

export function Input({label,idName,type,state,setState,icon,onclick}) {
    return (
        <div className={styles.boxInput}>
            <label htmlFor={idName}>{label}</label>
            <input
            id={idName} 
            name={idName} 
            type={type}
            value={state} 
            onChange={e => setState(e.target.value)} />
            {icon && <p className='text-xs flex items-center justify-end cursor-pointer' onClick={onclick}>{type === "password" ? 'Afficher':'Masquer'} le mot de passe <span className='text-xl ml-2'>{icon}</span></p>}
        </div>
    );
}