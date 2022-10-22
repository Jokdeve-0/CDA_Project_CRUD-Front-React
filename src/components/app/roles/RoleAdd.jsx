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


export function RoleAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [name, setName] = useState("jok");
    const handleSubmit = async () => {
        const role = new BaseRole({name});
        const newRole = await addEntity('role',role);
        if(newRole){
            await datasStore.getAllDatas();
            datasStore.updateDatasStore(datas);
            navigate('/home');
        }else{
            setError("❌ Une erreur est intervenue.");
        }
    }
    return (
    <>
     <H2 title="Créer des rôles"/>
     <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
                }
            }
            >
            <H2 title="Nouveau role"/>
            <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                <Input label={"Nom du rôle"} idName={"name"} type={"text"} state={name} setState={setName} />
                <div className={cssStandard.formBtnBox}>
                    <Button 
                    type={'submit'}
                    classname={cssStandard.formBtn}
                    >Créer</Button>
                </div>
            </div>
            </form>
        </div>
    </> 
    ); 
}