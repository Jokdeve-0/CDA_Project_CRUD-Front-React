import React from 'react';

export function Button({type, className, value,onClick, children}) {
    return (
        <button 
            type={type} 
            className={className}
            onClick={onClick} 
        >
            {value}
            {children}
        </button>
    );
}