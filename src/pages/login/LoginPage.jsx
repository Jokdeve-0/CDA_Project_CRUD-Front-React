import React, { useState } from 'react';
import { DatasContext } from 'src/application';
import { Login } from '../../components/app/Login/Login';
import { FcAddDatabase, FcDataConfiguration,FcConferenceCall, FcShipped } from "react-icons/fc";

import { LayoutPage } from 'src/components/layouts/LayoutPage';
import { AlertCmpt } from 'src/components/base/Alert/Alert';
import { Button } from 'src/components/base/Button/Button';
import cssStandard from 'src/components/styles/base.module.scss';
import { addFixtures, createDatabase, createTables } from 'src/store/requests';
import { datasStore } from 'src/store/resources/DatasStore';
import { handleStateDB } from 'src/store/resources/handlerStateDB';
import { Spinner } from 'src/components/base/Spinner/Spinner';

export function LoginPage() {
const datas = React.useContext(DatasContext);
const [ready,setReady] = useState();

React.useEffect(()=>{
  if(datas.stateDb[0]){
    setTimeout(()=>{
      setReady(true)
    },1000)
  }
},[datas.stateDb])

const createDatabaseSubmit = async () => {
  const dbCreated = await createDatabase();
  if(dbCreated.data.message){
    datas.stateDb[1]('empty')
  }
}

const createTablesSubmit = async () => {
  const response = await createTables();
  const {message} = response.data;
  if (message) {
      await datasStore.retrieveTablesNames();
      await datasStore.updateDatasStore(datas);
      await handleStateDB(datas);
   }
}

const AddFixturesSubmit = async () => {
  const added = await addFixtures();
  if(added.message || added.data.message){
    datas.stateDb[1]('full')
  }
}
// console.log(datas.stateDb[0])
    return (
        <LayoutPage>
            <LayoutPage.Main>

              {!ready && <Spinner />}

              {ready && datas.stateDb[0] && (datas.stateDb[0] === 'not exist')  && 
                <LayoutPage.Section>
                  <div className={cssStandard.boxAlert}>
                    <AlertCmpt
                      type={"failure"}
                      icon={FcAddDatabase}
                      title={'1ère étape : vous devez créer la base de données'}
                    >
                      <Button type = 'button' className ={cssStandard.btnDatabase}
                        value = 'Créer la base de données'
                        onClick = { async () => { await createDatabaseSubmit();}}
                      />   
                    </AlertCmpt>
                  </div>
                </LayoutPage.Section>
              }

              {ready && datas.stateDb[0] && (datas.stateDb[0] === 'empty')  && 
                <LayoutPage.Section>
                  <div className={cssStandard.boxAlert}>
                    <AlertCmpt
                      type={"warning"}
                      icon={FcDataConfiguration}
                      title={'2ème étape : vous devez créer les tables'}
                    >
                      <Button type = 'button' className ={cssStandard.btnDatabase}
                        value = 'Créer toutes les tables'
                        onClick = { async () => { await createTablesSubmit();}}
                      />   
                    </AlertCmpt>
                  </div>
                </LayoutPage.Section>
              }

              {ready && datas.stateDb[0] && (datas.stateDb[0] === 'ready')  && 
                <LayoutPage.Section>
                  <div className={cssStandard.boxAlert}>
                    <AlertCmpt
                      type={"info"}
                      icon={FcConferenceCall}
                      title={'3ème étape : vous devez ajouter les fixtures'}
                    >
                      <Button type = 'button' className ={cssStandard.btnDatabase}
                        value = 'Ajouter les fixtures'
                        onClick = { async () => { await AddFixturesSubmit();}}
                      />   
                    </AlertCmpt>
                  </div>
                </LayoutPage.Section>
              }

              {ready && datas.stateDb[0] && (datas.stateDb[0] === 'full')  && 
                <LayoutPage.Section>                
                  <div className={cssStandard.boxAlert}>
                    <AlertCmpt
                      type={"success"}
                      icon={FcShipped}
                      title={'Tout est ok ! Vous pouvez maintenant vous connecter.'}
                    >
                    </AlertCmpt>
                    <p className="text-base">Pseudo : <strong>admin@moovleen.com</strong></p>
                    <p className="text-base">Mot de passe : <strong>Aa@1Aa@1</strong></p>
                  </div>
                </LayoutPage.Section>           
              }
              
              {ready &&
              <LayoutPage.Section>
                  <Login/>
              </LayoutPage.Section>
              }

            </LayoutPage.Main>
        </LayoutPage>
    );
}