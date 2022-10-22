import React, {useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatasContext } from '../../../application';
import { datasStore } from '../../../store/resources/DatasStore';
import { Button } from '../../base/Button/Button';
import { Input } from '../../base/Input/Input';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';

export function Login() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [mail, setMail] = useState("jok@jok.jok");
    const [password, setPassword] = useState("$$$");
    const handleSubmit = async () => {
        // const newUser = await login('user',mail,password);
        // if(newUser){
        //     await datasStore.getAllDatas();
        //     datasStore.updateDatasStore(datas);
        //     navigate('/home');
        // }else{
        //     setError("❌ Une erreur est intervenue.");
        // }
    }
    return (<>
        <H2 title="La page de connexion"/>
        <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
                }
            }
            >
            <H2 title="Connexion"/>
            <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                <Input label={"Votre adresse Email"} idName={"mail"} type={"email"} state={mail} setState={setMail} />
                <Input label={"Votre mot de passe"} idName={"password"} type={"password"} state={password} setState={setPassword} />
                <div className={cssStandard.formBtnBox}>
                    <Button 
                    type={'submit'}
                    classname={cssStandard.formBtn}
                    >Se Connecter</Button>
                </div>
            </div>
            </form>
        </div>
   </> );
}