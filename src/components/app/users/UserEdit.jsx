import React, { useState, useContext, useEffect } from 'react';
import { DatasContext } from '../../../application';
import { deleteEntity, editEntity, selectEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {User}  from '../../../models/User'
import { datasStore } from '../../../store/resources/DatasStore';
import { DateTime } from 'luxon';
import { Button } from '../../base/Button/Button';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';


export function UserEdit({setUserTable}) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [user,setUser] = useState();
    const [loadingUser,setLoadingUser] = useState(false);
    const [username, setUsername] = useState("");
        const [mail, setMail] = useState("");
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
            setUsername(user.username);
            setMail(user.mail);
            setLoadingUser(true);
        }

    },[id, user, username, mail, loadingId, loadingUser, params]);
  
        const datas = useContext(DatasContext);
        const navigate = useNavigate();
        const [error, setError] = useState("");
 
    const handleSubmit = async () => {
        const userEdited = new User({id:user.id,username:username,mail: mail,created_at:user.created_at,updated_at: DateTime.local({locale:"fr"}).toISO()});
        try{
            const newUserEdited = await editEntity('user',userEdited);
            if(newUserEdited.status === 202){
                await datasStore.getAllDatas();
                datasStore.updateDatasStore(datas);
                setUserTable(userEdited);
            }else{
                setError("❌ Une erreur est intervenue.");
            }
        }catch(e){
            setError("❌ Une erreur est intervenue.");
        }
    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('user',id);
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
                <H2 title="Modifier un utilisateur"/>  
                <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                    <Input label={"Nom d'utilisateur"} idName={"username"} type={"text"} state={username} setState={setUsername} />
                    <Input label={"Adresse Email"} idName={"mail"} type={"email"} state={mail} setState={setMail} />
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
                >Supprimer l'utilisateur</Button>
            </div>
        </div>

    </> 
    ); 
}