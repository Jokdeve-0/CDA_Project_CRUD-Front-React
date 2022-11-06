import React from "react";
import { LinkMenu } from "../../layouts/Header/LinkMenu";
import {Dropdown} from 'flowbite-react'
import styles from './Dropdown.module.scss'
import { useNavigate } from "react-router-dom";
import { DatasContext } from "src/application";
import { logout } from "src/store/requests";
export function DropdownApp() {
    const navigate = useNavigate();
    const {isTokenValid} = React.useContext(DatasContext);
    return (<>
<div className={styles.dropdownBox}>
<Dropdown label="Général">
 
    <Dropdown.Item>
        <LinkMenu url={'/'} title={'Accueil'} />
    </Dropdown.Item>
    <Dropdown.Divider />

{!isTokenValid[0] && (<>
    <Dropdown.Item>
        <LinkMenu url={'/login'} title={'Connexion'} />
    </Dropdown.Item>
    <Dropdown.Divider />

</>)}

{isTokenValid[0] && (<>
    <Dropdown.Item>
        <LinkMenu onclick={async (e)=>{
            e.preventDefault();
            await logout();
            
            localStorage.clear();
            navigate('/login');
            isTokenValid[1](false);
        }} title={'Déconnexion'} />
    </Dropdown.Item>
    <Dropdown.Divider />
</>)}


</Dropdown>
</div>
   </> );
}