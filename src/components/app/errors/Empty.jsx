import React from "react";
import cssStandard from '../../styles/base.module.scss';

export function MessageEmpty({message}){
    return(
    <p className={cssStandard.messageEmpty}>
        <span>⚠️</span>
        <span>{message}</span>
    </p>
    );
}