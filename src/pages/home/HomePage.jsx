import React from 'react';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { TablesTable } from 'src/components/app/tables/TablesTable';
import { RolesTable } from 'src/components/app/roles/RolesTables';
import { UsersTable } from 'src/components/app/users/UsersTable';
import { EditorsTable } from 'src/components/app/editors/EditorsTable';
import { MembersTable } from 'src/components/app/members/MembersTable';
import { BooksTable } from 'src/components/app/books/BooksTable';
import { DatasContext } from 'src/application';
import { datasStore } from 'src/store/resources/DatasStore';

export function HomePage() {
    const datas = React.useContext(DatasContext);
    const [isInitDatas,setInitDatas] = React.useState();

    React.useEffect(()=>{
        if(!isInitDatas){
            setTimeout(()=>{
                datasStore.updateDatasStore(datas);
                setInitDatas(true);
            },2000)// just for wathing
        }
    }, [datas, isInitDatas])
    return (
        <LayoutPage>
            <LayoutPage.Main>
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
            </LayoutPage.Main>
        </LayoutPage>
    );
}