import React, {useState,useEffect } from 'react';
import { RoleEdit } from '../../components/app/roles/RoleEdit';
import { RoleTable } from '../../components/app/roles/RoleTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function RoleDetailsPage() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [role,setRole] = useState();
    const [loadingRole,setLoadingRole] = useState(false);
    useEffect(()=>{
        const getRole= async (roleId)=>{
            const infos = await (await selectEntity('role',{id:roleId})).data.infos;
            setRole(infos[0]);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getRole(id);
            setLoadingId(true);
        }
        if(role && !loadingRole){
            setLoadingRole(true);
        }
    },[id, loadingId, loadingRole, params, role]);

    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                 <RoleTable role={role} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <RoleEdit setRoleTable={setRole} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}