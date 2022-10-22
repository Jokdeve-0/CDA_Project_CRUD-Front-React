import React from 'react';

export function Button({type, classname, value,onClick, children}) {
    return (
        <button 
            type={type} 
            className={classname}
            onClick={onClick} 
        >
            {value}
            {children}
        </button>
    );
}