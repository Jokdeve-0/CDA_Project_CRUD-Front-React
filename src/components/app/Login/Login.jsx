import React, {useState, useContext } from 'react';
import validations from '../../../resources/Validation';
import { login } from '../../../store/requests';
import { DatasContext } from '../../../application';
import { datasStore } from '../../../store/resources/DatasStore';
import { Button } from '../../base/Button/Button';
import { Input } from '../../base/Input/Input';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';
import { MessageError } from '../errors/Errors';
import { authentification, setStateToken } from '../../../store/resources/authentification';
import { BaseUser } from 'src/models/User';
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

export function Login() {
    const datas = useContext(DatasContext);

    const [error, setError] = useState();
    const [mail, setMail] = useState("admin@moovleen.com");
    const [password, setPassword] = useState("Aa@1Aa@1");

    const [typePassword, setTypePassword] = useState(true);
    const [icon, setIcon] = useState(true);
   
    const handleSubmit = async () => {
      const entity = new BaseUser({mail,password});

        const valid = validations.checkers(entity,['mail','password']);
        let isValid = true;
        for( const val in valid ){if(valid[val]){isValid = false;}}
        if(isValid){
          const isLogin = await login({mail,password});
          if(isLogin.status === 200){
            await datasStore.initializeDatasStore(datas);
            setStateToken(datas);
            datas.isTokenValid[1](authentification());
            document.location.href= '/home'       
          }else{
              setError(validations.messages.server);
          }
        }else{
          setError(validations.messages.ids);
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
                <Input label={"Votre adresse Email"} idName={"mail"} type={"email"} state={mail} setState={setMail} />

                <Input label={"Mot de passe"} 
                idName={"password"} type={typePassword? "password" : "text"} 
                state={password} setState={setPassword} icon={icon ? <BsFillEyeFill/> : <BsFillEyeSlashFill/> } onclick={()=>{
                    setTypePassword(!typePassword);
                    setIcon(!icon);
                }}/>

                <div className={cssStandard.formBtnBox}>
                    <Button
                    disabled={datas.stateDb[0] !== 'full' ? "disabled" : "" } 
                    type={'submit'}
                    className={cssStandard.formBtn}
                    >Se Connecter</Button>
                </div>
            </div>
            </form>
        </div>
   </> );
}