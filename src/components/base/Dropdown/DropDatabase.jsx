import React, { useContext } from "react";
import styles from './Dropdown.module.scss'
import {Dropdown} from 'flowbite-react';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';
import { DatasContext } from "src/application";
import { addFixtures, createDatabase, deleteDatabase, tablesReset } from "src/store/requests";
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
        }
    }

    const completed = async () => {
        await addFixtures();
        await datasStore.getAllDatas();
        datasStore.updateDatasStore(datas);
    }

    const reset = async () => {
        const response = await tablesReset();
        const {message} = response.data;
        if (message) {
            localStorage.clear();
            await datasStore.getAllDatas();
            datasStore.updateDatasStore(datas);
        }
    }

    const deleted = async () => {
        const response = await deleteDatabase();
        const {message} = response.data;
        if (message) {
            localStorage.clear();
            document.location.href='http://localhost:3000/home';
        }
    }

    return (<>
        <div className={styles.dropdownBox}>
            <Dropdown label="Base de données">
                <Dropdown.Item>
                    <Button
                        type = 'button' classname ={cssStandard.navMenuBtn}
                        value = 'Ajouter les fixtures'
                        onClick = {async () => {await completed();}}
                    />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Button type = 'button' classname ={cssStandard.navMenuBtn}
                        value = 'Créer toutes les tables'
                        onClick = { async () => { await created();}}
                    />                
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Button
                        type = 'button' classname ={cssStandard.navMenuBtn}
                        value = "Supprimer toutes les données"
                        onClick = {async () => {await reset();}}
                    />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Button
                        type = 'button' classname ={cssStandard.navMenuBtn}
                        value = "Supprimer toutes les tables"
                        onClick = {async () => {await deleted();}}
                    />
                </Dropdown.Item>
            </Dropdown>
        </div>
   </> );
}

