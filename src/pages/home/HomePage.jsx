import React, { useContext, useState } from 'react';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { TablesTable } from 'src/components/app/tables/TablesTable';
import { RolesTable } from 'src/components/app/roles/RolesTables';
import { UsersTable } from 'src/components/app/users/UsersTable';
import { EditorsTable } from 'src/components/app/editors/EditorsTable';
import { MembersTable } from 'src/components/app/members/MembersTable';
import { BooksTable } from 'src/components/app/books/BooksTable';
import { DatasContext } from 'src/application';
import { datasStore } from 'src/store/resources/DatasStore';
import { setStateToken } from 'src/store/resources/authentification';

export function HomePage() {
    const datas = useContext(DatasContext);
    const [isInitDatas,setInitDatas] = useState();
    const [ready,setReady] = useState();

    React.useEffect(()=>{

      const init = async () => {

        if(!datas.token[0]){
          setStateToken(datas);
        }
        if(!isInitDatas && datas.token[0]){
          await datasStore.initializeDatasStore(datas);
          setInitDatas(true);
        }

      }
      if(!isInitDatas && datas.token[0]){
          init();
      }
      // check all ready
      if(isInitDatas && datas.token[0]){
        setTimeout(()=>{
          setReady(true);
        },100)
      }
    }, [datas, isInitDatas])
    return (
        <LayoutPage>
            <LayoutPage.Main>
            {ready &&<>
                <LayoutPage.Section>
                   <TablesTable isInitDatas={isInitDatas}/> 
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <RolesTable isInitDatas={isInitDatas}/> 
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <UsersTable isInitDatas={isInitDatas}/> 
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <EditorsTable isInitDatas={isInitDatas}/> 
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <MembersTable isInitDatas={isInitDatas}/> 
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <BooksTable isInitDatas={isInitDatas}/> 
                </LayoutPage.Section> 
              </>}
            </LayoutPage.Main>
        </LayoutPage>
    );
}