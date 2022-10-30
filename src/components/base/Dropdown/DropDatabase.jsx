import React, { useContext } from "react";
import styles from './Dropdown.module.scss'
import {Dropdown} from 'flowbite-react';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';
import { DatasContext } from "src/application";
import {createDatabase, deleteDatabase, tablesReset } from "src/store/requests";
import { datasStore } from "src/store/resources/DatasStore";
export function DropDatabase() {
    const datas = useContext(DatasContext);
    const tables = datas.tables;

   const created = async () => {
       const response = await createDatabase();
       const {message} = response.data;
       if (message) {
           await datasStore.retrieveTablesNames();
           tables[1]( JSON.parse(localStorage.getItem('tables')));
           datas.stateDb[1]("ready");
        }
    }

    const reset = async () => {
        const response = await tablesReset();
        const {message} = response.data;
        if (message) {
            datasStore.resetDatasStoreItems();
            datasStore.updateDatasStore(datas);
            datas.stateDb[1]("ready");
        }
    }

    const deleted = async () => {
        const response = await deleteDatabase();
        const {message} = response.data;
        if (message) {
            localStorage.clear();
            datas.tables[1]([]);
            datas.stateDb[1]("empty");
        }
        
    }

    return (<>
        <div className={styles.dropdownBox}>
            <Dropdown label="Base de données">
                <Dropdown.Item>
                    <Button type = 'button' className ={cssStandard.navMenuBtn}
                        value = 'Créer toutes les tables'
                        onClick = { async () => { await created();}}
                    />                
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Button
                        type = 'button' className ={cssStandard.navMenuBtn}
                        value = "Supprimer toutes les données"
                        onClick = {async () => {await reset();}}
                    />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Button
                        type = 'button' className ={cssStandard.navMenuBtn}
                        value = "Supprimer toutes les tables"
                        onClick = {async () => {await deleted();}}
                    />
                </Dropdown.Item>
            </Dropdown>
        </div>
   </> );
}

