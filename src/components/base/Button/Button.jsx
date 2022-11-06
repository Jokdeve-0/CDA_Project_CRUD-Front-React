import React from 'react';

export function Button({type,disabled, className, value,onClick, children}) {
    return (
        <button disabled={disabled}
            type={type}
            className={className}
            onClick={onClick} 
        >
            {value}
            {children}
        </button>
    );
}