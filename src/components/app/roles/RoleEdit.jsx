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
import { MessageError } from '../errors/Errors';
import { MessageSuccess } from '../errors/Success';
import validations from 'src/resources/Validation';


export function RoleEdit({setRoleTable}) {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [role,setRole] = useState();
    const [loadingRole,setLoadingRole] = useState(false);
    const [name, setRolename] = useState("");
    const [success, setSuccess] = useState();
    const [errorName, setErrorName] = useState();
    const [error, setError] = useState();
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
            setLoadingRole(true);
        }

    },[id, role, name, loadingId, loadingRole, params]);
  
    const initErrors = () => {
        setError();
        setSuccess();
        setErrorName();
    }
 
    const handleSubmit = async () => {
        initErrors();
        const roleEdited = new Role({
            id:role.id,
            name:name,
            created_at:role.created_at,
            updated_at: DateTime.local({locale:"fr"}).toISO()
        });
        const valid = validations.checkers(role,['name']);
        if(valid){
            try{
                const newRoleEdited = await editEntity('role',roleEdited);
                if(newRoleEdited.status === 201){
                    await datasStore.initializeDatasStore(datas);
                    setRoleTable(roleEdited);
                    setSuccess('Mise à jour !');
                    setTimeout(()=>{
                        initErrors();
                    },5000)
                }else{
                    setError(validations.messages.server);
                    setTimeout(()=>{
                        initErrors();
                    },5000)
                }
            }catch(e){
                console.log("error",e)
                var  {error} = e.response.data;
                console.log(error)
                if(error.name){
                    var time = 5;
                    setInterval(()=>{
                        setErrorName(error.message+ ' redirection dans :' +time+'s');
                        time--;
                    },1000);
                    setTimeout(()=>{
                        navigate('/login');
                    },6000);
                }else{
                    e.response.data.error 
                    && e.response.data.error.indexOf('role.unique_role_name') !== -1
                        ? setErrorName(validations.messages.name)
                        : setError(validations.messages.server);
                }
            }
        }else{
            setErrorName(validations.valid.role);
        }
    }

    const handleClick= async () => {
       
        const isDeleted = await deleteEntity('role',id);
        if(isDeleted){
            await datasStore.initializeDatasStore(datas);
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
                    {success && <MessageSuccess id="success" success={success} />}
                    {error && <MessageError error={error} />}

                    {errorName && <MessageError error={errorName} />}
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