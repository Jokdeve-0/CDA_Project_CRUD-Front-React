import React from "react";
import { LinkMenu } from "../../layouts/Header/LinkMenu";
import {Dropdown} from 'flowbite-react'
import styles from './Dropdown.module.scss'
export function DropdownApp() {
    return (<>
<div className={styles.dropdownBox}>
<Dropdown label="Général">
  <Dropdown.Item>
  <LinkMenu url={'/'} title={'Accueil'} />
  </Dropdown.Item>
</Dropdown>
</div>
   </> );
}