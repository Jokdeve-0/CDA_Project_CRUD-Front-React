import React from 'react';
import cssStandard from '../../styles/base.module.scss';

export function MessageError({error}){

    return(
        <p className={cssStandard.messageError}>
            <span>⛔</span>
            <span>{error}</span>
        </p>
    );
}