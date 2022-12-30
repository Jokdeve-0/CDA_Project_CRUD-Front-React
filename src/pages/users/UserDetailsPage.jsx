/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect } from 'react';
import { EditorMembersEditor } from 'src/components/app/members/EditorMembersEditor';
import { UserEdit } from '../../components/app/users/UserEdit';
import { UserTable } from '../../components/app/users/UserTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function UserDetailsPage() {
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [user,setUser] = useState();
    const [editors,setEditors] = useState();
    const [loadingUser,setLoadingUser] = useState(false);
    useEffect(()=>{
        const getUser= async (userId)=>{
            const results = await (await selectEntity('user',{id:userId})).data.results;
            console.log(results)
            console.log(results)
            setUser(results['results'][0]);
            setEditors(results['relationResults']);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getUser(id);
            setLoadingId(true);
        }
        if(user && !loadingUser){
            setLoadingUser(true);
        }
    },[id, loadingId, loadingUser, params, user]);

    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <UserEdit user={user} setUser={setUser} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                 <UserTable user={user} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                  <EditorMembersEditor editors={editors} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}