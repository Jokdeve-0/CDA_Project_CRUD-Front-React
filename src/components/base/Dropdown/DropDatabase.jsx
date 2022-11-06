import React, { useContext } from "react";
import styles from './Dropdown.module.scss'
import {Dropdown} from 'flowbite-react';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';
import { DatasContext } from "src/application";
import {addFixtures, createTables, deleteDatabase, tablesReset } from "src/store/requests";
import { datasStore } from "src/store/resources/DatasStore";
import { handleStateDB } from "src/store/resources/handlerStateDB";
export function DropDatabase() {
    const datas = useContext(DatasContext);
    const tables = datas.tables;

   const created = async () => {
       const response = await createTables();
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
            await datasStore.initializeDatasStore(datas);
            await handleStateDB(datas);
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

    const completed = async () => {
      await addFixtures();
      await datasStore.initializeDatasStore(datas);
      await handleStateDB(datas);
  }

    return (<>
        <div className={styles.dropdownBox}>


            <Dropdown label="Base de données">
            {datas.stateDb[0] === "empty" &&
                <>
                <Dropdown.Item>
                    <Button type = 'button' className ={cssStandard.navMenuBtn}
                        value = 'Créer toutes les tables'
                        onClick = { async () => { await created();}}
                    />                
                </Dropdown.Item>
                <Dropdown.Divider />
                </>
            }
            {datas.stateDb[0] === "ready" &&
              <>
              <Dropdown.Item>
                  <Button
                      type = 'button' className ={cssStandard.navMenuBtn}
                      value = 'Ajouter les fixtures'
                      onClick = {async () => {await completed();}}
                  />
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
            }
            {datas.stateDb[0] === "full" &&
                <>
                <Dropdown.Item>
                    <Button
                        type = 'button' className ={cssStandard.navMenuBtn}
                        value = "Supprimer toutes les données"
                        onClick = {async () => {await reset();}}
                    />
                </Dropdown.Item>
                <Dropdown.Divider />
                </>
            }
            {datas.stateDb[0] !== "empty" &&
                <Dropdown.Item>
                    <Button
                        type = 'button' className ={cssStandard.navMenuBtn}
                        value = "Supprimer toutes les tables"
                        onClick = {async () => {await deleted();}}
                    />
                </Dropdown.Item>
            }
            </Dropdown>

        </div>
   </> );
}

