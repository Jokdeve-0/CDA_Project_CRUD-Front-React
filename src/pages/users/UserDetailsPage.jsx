import React, {useState,useEffect } from 'react';
import { UserEdit } from '../../components/app/users/UserEdit';
import { UserTable } from '../../components/app/users/UserTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function UserDetailsPage() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [user,setUser] = useState();
    const [loadingUser,setLoadingUser] = useState(false);
    useEffect(()=>{
        const getUser= async (userId)=>{
            const infos = await (await selectEntity('user',{id:userId})).data.infos;
            setUser(infos[0]);
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
                 <UserTable user={user} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <UserEdit setUserTable={setUser} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}