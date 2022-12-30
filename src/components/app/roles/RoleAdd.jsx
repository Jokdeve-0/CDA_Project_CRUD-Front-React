import React, {useState, useContext } from 'react';
import { DatasContext } from '../../../application';
import { addEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {BaseRole}  from '../../../models/Role'
import { datasStore } from '../../../store/resources/DatasStore';
import { H2 } from '../../base/Title/H2';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';
import validations from 'src/resources/Validation';
import { MessageError } from '../errors/Errors';


export function RoleAdd() {
    
    const initErrors = () => {
        setError();
        setErrorName();  
    }
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState();
    
    const [errorName, setErrorName] = useState();
    const [name, setName] = useState("New Role");

    const handleSubmit = async () => {
        initErrors();
        const role = new BaseRole({name});
        const isValid = validations.checkers(role,['name']);
        if(!isValid.name){
            try{
                const response = await addEntity('role',role);
                if(response.status === 200){
                    await datasStore.initializeDatasStore(datas);
                    navigate('/home');
                }else{
                    setError(validations.messages.server);
                }
            }catch(e){
                console.log(e);
                console.log(e.response.data.error.sqlMessage.indexOf('role.unique_role_name') !== -1);
                e.response
                && e.response.data.error.sqlMessage.indexOf('role.unique_role_name') !== -1
                    ? setErrorName(validations.messages.name)
                    : setError(validations.messages.server);
            }
        }else{
            setErrorName(validations.valid.role);
        }
        setTimeout(()=>{
          initErrors();
      },3000)
    }
    
    return (
    <>
     <H2 title="Créer des rôles"/>
     <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
            }}>
            <H2 title="Nouveau role"/>
            <div className={cssStandard.formContent}>
                  {error && <MessageError error={error} />}

                {errorName && <MessageError error={errorName} />}
                <Input label={"Nom du rôle"} 
                idName={"name"} type={"text"} 
                state={name} setState={setName} />

                <div className={cssStandard.formBtnBox}>
                    <Button 
                    type={'submit'}
                    className={cssStandard.formBtn}
                    >Créer</Button>
                </div>
            </div>
            </form>
        </div>
    </> 
    ); 
}