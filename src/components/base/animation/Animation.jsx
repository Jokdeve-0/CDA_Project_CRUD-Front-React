import React from "react";
import styles from "./Animation.module.scss";
export function Animation({children}){
    return(
        <div className={styles.animate}>
            {children}
        </div>
    );
}