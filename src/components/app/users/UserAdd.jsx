import React, {useState, useContext } from 'react';
import { DatasContext } from '../../../application';
import { addEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {BaseUser}  from '../../../models/User'
import { datasStore } from '../../../store/resources/DatasStore';
import { H2 } from '../../base/Title/H2';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';


export function UserAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [username, setUsername] = useState("jok");
    const [mail, setMail] = useState("jok@jok.jok");
    const [password, setPassword] = useState("$$$");
    const [passwordConfiration, setPasswordConfiration] = useState("$$$");
    const handleSubmit = async () => {
        const entity = new BaseUser({username,mail,password});
        try{
            const newUser = await addEntity('user',{entity,table:'user',unique:{mail:'mail',username:'username'}});
            console.log(newUser);
            if(newUser.status === 202){
                await datasStore.getAllDatas();
                datasStore.updateDatasStore(datas);
                navigate('/home');
            }else{
                setError("❌ Une erreur est intervenue.");
            }
        }catch(e){
            setError("❌ Une erreur est intervenue.");
        }
    }
    return (
    <>
     <H2 title="Créer des utilisateurs"/>
     <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
                }
            }
            >
            <H2 title="Nouvel utilisateur"/>
            <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                <Input label={"Nom d'utilisateur"} idName={"username"} type={"text"} state={username} setState={setUsername} />
                <Input label={"Adresse Email"} idName={"mail"} type={"email"} state={mail} setState={setMail} />
                <Input label={"Mot de passe"} idName={"password"} type={"password"} state={password} setState={setPassword} />
                <Input label={"Confirmation du mot de passe"} idName={"passwordConfiration"} type={"password"} state={passwordConfiration} setState={setPasswordConfiration} />
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