import React from "react";

import cssStandard from '../../styles/base.module.scss';

export function MessageSuccess({success}){
    return(
        <p className={cssStandard.messageSuccess}>
            <span>✅</span>
            <span>{success}</span>
        </p>
    );
}