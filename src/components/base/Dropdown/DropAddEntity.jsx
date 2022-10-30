import React from "react";
import { LinkMenu } from "../../layouts/Header/LinkMenu";
import {Dropdown} from 'flowbite-react'
import styles from './Dropdown.module.scss'
import { Button } from "../Button/Button";
import { addFixtures} from "src/store/requests";
import cssStandard from '../../styles/base.module.scss';
import { datasStore } from "src/store/resources/DatasStore";
import { DatasContext } from "src/application";
export function DropAddEntity() {
    const datas = React.useContext(DatasContext);
    const {isTokenValid} = datas;
    const completed = async () => {
        await addFixtures();
        await datasStore.initializeDatasStore(datas);
        datas.stateDb[1]("full");
    }
    return (<>

<div className={styles.dropdownBox}>
<Dropdown label="Ajouter des entités">
<Dropdown.Item>
    <Button
        type = 'button' className ={cssStandard.navMenuBtn}
        value = 'Ajouter les fixtures'
        onClick = {async () => {await completed();}}
    />
</Dropdown.Item>
 <Dropdown.Divider />
 {isTokenValid[0] && 
 (<>
    <Dropdown.Item>
        <LinkMenu url={'/role/add'} title={'Rôle'}/>
    </Dropdown.Item>
    <Dropdown.Divider />

    <Dropdown.Item>
        <LinkMenu url={'/user/add'} title={'Utilisateur'}/>
    </Dropdown.Item>
    <Dropdown.Divider />

    <Dropdown.Item>
        <LinkMenu url={'/editor/add'} title={'Éditeur'}/>
    </Dropdown.Item>
    <Dropdown.Divider />
    
    <Dropdown.Item>
        <LinkMenu url={'/member/add'} title={'Membre'}/>
    </Dropdown.Item>
    <Dropdown.Divider />

    <Dropdown.Item>
        <LinkMenu url={'/book/add'} title={'Ouvrage'}/>
    </Dropdown.Item>
 </>)
 }
</Dropdown>
  
</div>
   </> );
}