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
import { MessageError } from '../errors/Errors';
import validations from 'src/resources/Validation';
import { MessageSuccess } from '../errors/Success';


export function UserEdit({setUserTable}) {
    const navigate = useNavigate();
    const datas = useContext(DatasContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [user,setUser] = useState();
    const [loadingUser,setLoadingUser] = useState(false);
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [errorName, setErrorName] = useState();
    const [errorMail, setErrorMail] = useState();

    const initErrors = () => {
        setError();
        setSuccess();
        setErrorName();
        setErrorMail();
    }

    const setErrors = (valid) => {
        setErrorName(valid.username);
        setErrorMail(valid.mail); 
        setTimeout(()=>{
            initErrors();
        },5000)
    }

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
  
       
 
    const handleSubmit = async () => {
        initErrors();
        const entity = new User(
            {id:user.id,
                username:username,
                mail: mail,
                created_at:user.created_at,
                updated_at: DateTime.local({locale:"fr"}).toISO()
            });
        const valid = validations.checkers(entity, ['username','mail']);
        let isValid = true;
        for( const val in valid ){if(valid[val]){isValid = false;}}
        if(isValid){
            try{
                const newUserEdited = await editEntity('user',entity);
                if(newUserEdited.status === 201){
                    await datasStore.initializeDatasStore(datas);
                    setUserTable(entity);
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
                e.response.data.error 
                && e.response.data.error.indexOf('user.unique_user_mail') !== -1
                ? setErrorMail(validations.messages.mail)
                : setErrorName(validations.messages.username);
                setTimeout(()=>{
                    initErrors();
                },5000)
            }
        }else{
            setErrors(valid);
        }

    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('user',id);
        if(isDeleted.status === 201){
            await datasStore.initializeDatasStore(datas);
            navigate('/home');
        }else{
            setError(validations.messages.server);
        }
    }
    return (
        <div className={cssStandard.formBox}>
        <form
        onSubmit={async (e)=>{
            e.preventDefault();
            await handleSubmit();
        }}>
            <H2 title="Modifier un utilisateur"/>  
            <div className={cssStandard.formContent}>
                {success && <MessageSuccess id="success" success={success} />}
                {error && <MessageError error={error} />}

                {errorName && <MessageError error={errorName} />}
                <Input label={"Nom d'utilisateur"} 
                idName={"username"} type={"text"} 
                state={username} setState={setUsername} />

                {errorMail && <MessageError error={errorMail} />}
                <Input label={"Adresse Email"} 
                idName={"mail"} type={"email"} 
                state={mail} setState={setMail} />

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
    ); 
}