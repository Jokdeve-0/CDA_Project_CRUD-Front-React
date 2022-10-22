import React, { useState, useContext, useEffect } from 'react';
import { DatasContext } from '../../../application';
import { deleteEntity, editEntity, selectEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {Role}  from '../../../models/Role'
import { datasStore } from '../../../store/resources/DatasStore';
import { DateTime } from 'luxon';
import { Button } from '../../base/Button/Button';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';


export function RoleEdit({setRoleTable}) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [role,setRole] = useState();
    const [loadingRole,setLoadingRole] = useState(false);
    const [name, setRolename] = useState("");
        const [mail, setMail] = useState("");
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
            setRolename(role.name);
            setMail(role.mail);
            setLoadingRole(true);
        }

    },[id, role, name, mail, loadingId, loadingRole, params]);
  
        const datas = useContext(DatasContext);
        const navigate = useNavigate();
        const [error, setError] = useState("");
 
    const handleSubmit = async () => {
        const roleEdited = new Role({id:role.id,name:name,mail: mail,created_at:role.created_at,updated_at: DateTime.local({locale:"fr"}).toISO()});
        try{
            const newRoleEdited = await editEntity('role',roleEdited);
            if(newRoleEdited.status === 202){
                await datasStore.getAllDatas();
                datasStore.updateDatasStore(datas);
                setRoleTable(roleEdited);
            }else{
                setError("❌ Une erreur est intervenue.");
            }
        }catch(e){
            setError("❌ Une erreur est intervenue.");
        }
    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('role',id);
        console.log(isDeleted)
        if(isDeleted){
            await datasStore.getAllDatas();
            datasStore.updateDatasStore(datas);
            navigate('/home');
        }else{
            setError("❌ Une erreur est intervenue.");
        }
    }
    return (
    <>
         <div className={cssStandard.formBox}>
            <form
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
            }}>
                <H2 title="Modifier un Role"/>  
                <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                    <Input label={"Nom du role"} idName={"name"} type={"text"} state={name} setState={setRolename} />
                    <div className={cssStandard.formBtnBox}>
                        <Button 
                        type={'submit'}
                        className={cssStandard.formBtn}
                        >Modifier</Button>
                    </div>
                </div>          
            </form>
            <div className={cssStandard.formBtnDelete}>
                <Button
                    type={'button'} onClick={async ()=>{
                        if (window.confirm("Voulez vraiment supprimer ?")) {
                            await handleClick();
                        }
                    }}
                >Supprimer le rôle</Button>
            </div>
        </div>

    </> 
    ); 
}