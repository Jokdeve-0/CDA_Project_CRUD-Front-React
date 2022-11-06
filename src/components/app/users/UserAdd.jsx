import React, {useState, useContext } from 'react';
import { DatasContext } from 'src/application';
import { signup } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {BaseUser}  from '../../../models/User'
import { datasStore } from '../../../store/resources/DatasStore';
import { H2 } from '../../base/Title/H2';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';
import { MessageError } from '../errors/Errors';
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import validations from 'src/resources/Validation';

export function UserAdd() {

    const datas = useContext(DatasContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfiration, setPasswordConfiration] = useState('');
    // toggle password icon
    const [typePassword, setTypePassword] = useState(true);
    const [icon, setIcon] = useState(true);

    
    const [error, setError] = useState();
    const [errorName, setErrorName] = useState();
    const [errorMail, setErrorMail] = useState();
    const [errorPass, setErrorPass] = useState();
    const [errorPassConf, setErrorPassConf] = useState();

    const initErrors = () => {
        setError();
        setErrorName();
        setErrorMail();
        setErrorPass();
        setErrorPassConf();   
    }
    const setErrors = (valid) => {
        setErrorName(valid.username);
        setErrorMail(valid.mail);
        setErrorPass(valid.password);
        setErrorPassConf(valid.passwordConfirme);   
        setTimeout(()=>{
            initErrors();
        },5000)
    }

    const handleSubmit = async () => {
        initErrors();
        const entity = new BaseUser({username,mail,password});

        const valid = validations.registrationCheck(entity,passwordConfiration);
        let isValid = true;
        for( const val in valid ){if(valid[val]){isValid = false;}}
        if(isValid){
            try{
                const newUser = await signup(entity);
                if(newUser.status === 200){
                    await datasStore.initializeDatasStore(datas);
                    navigate('/home');
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
    return (
    <>
     <H2 title="Créer des utilisateurs"/>
     <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
            }}>
            <H2 title="Nouvel utilisateur"/>
            <div className={cssStandard.formContent}>
                  {error && <MessageError error={error} />}

                {errorName && <MessageError error={errorName} />}
                <Input label={"Nom d'utilisateur"} 
                idName={"username"} type={"text"} 
                state={username} setState={setUsername} />
                
                {errorMail && <MessageError error={errorMail} />}
                <Input label={"Adresse Email"} 
                idName={"mail"} type={"text"} 
                state={mail} setState={setMail} />

                {errorPass && <MessageError error={errorPass} />}
                <Input label={"Mot de passe"} 
                idName={"password"} type={typePassword? "password" : "text"} 
                state={password} setState={setPassword} icon={icon ? <BsFillEyeSlashFill/> : <BsFillEyeFill/> } onclick={()=>{
                    setTypePassword(!typePassword);
                    setIcon(!icon);
                }}/>

                {errorPassConf && <MessageError error={errorPassConf} />}
                <Input label={"Confirmation du mot de passe"} 
                idName={"passwordConfiration"} type={typePassword? "password" : "text"}
                state={passwordConfiration} setState={setPasswordConfiration} />

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