import React from "react";
import { Option } from "./Option";
import styles from './Dropdown.module.scss';

function Dropdown({children}) {
    return (
        <div className={styles.boxSelect}>
            <select>{children}</select>
        </div>
    );
}

Dropdown.Option = Option;
export {Dropdown};