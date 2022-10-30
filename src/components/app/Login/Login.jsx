import React, {useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import log from '../../../resources/Log'
import validations from '../../../resources/Validation';
import { login } from '../../../store/requests';
import { DatasContext } from '../../../application';
import { datasStore } from '../../../store/resources/DatasStore';
import { Button } from '../../base/Button/Button';
import { Input } from '../../base/Input/Input';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';
import { MessageError } from '../errors/Errors';
import { authentification } from '../../../store/resources/authentification';

export function Login() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [refresh,setRefresh] = useState();
    const [error, setError] = useState();
    const [errorId, setErrorId] = useState();
    const [mail, setMail] = useState("admin@moovleen.com");
    const [password, setPassword] = useState("Aa@1Aa@1");
   
    const handleSubmit = async () => {
        const isLogin = await login({mail,password});
        const {user} = isLogin.data;
        if(isLogin.status === 200){
            localStorage.setItem('token',JSON.stringify(user.token.token)) 
            await datasStore.initializeDatasStore(datas);
            datas.isTokenValid[1](authentification());
            navigate("/home");       
        }else{
            setError(validations.messages.server);
        }
    }
    return (<>
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
                {error && <MessageError error={error} />}
                {errorId && <MessageError error={errorId} />}
                <Input label={"Votre adresse Email"} idName={"mail"} type={"email"} state={mail} setState={setMail} />

                <Input label={"Votre mot de passe"} idName={"password"} type={"password"} state={password} setState={setPassword} />

                <div className={cssStandard.formBtnBox}>
                    <Button 
                    type={'submit'}
                    className={cssStandard.formBtn}
                    >Se Connecter</Button>
                </div>
            </div>
            </form>
        </div>
   </> );
}