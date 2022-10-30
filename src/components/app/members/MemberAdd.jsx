import React, {useState, useContext } from 'react';
import { DatasContext } from '../../../application';
import { addEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {BaseEditorMember}  from '../../../models/EditorMember'
import { datasStore } from '../../../store/resources/DatasStore';
import { H2 } from '../../base/Title/H2';
import { Button } from '../../base/Button/Button';

import cssStandard from '../../styles/base.module.scss';

export function MemberAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [editor_id, setEditor_id] = useState();
    const [user_id, setUser_id] = useState();
    const handleSubmit = async () => {
        const editor_member = new BaseEditorMember({editor_id,user_id});
        const newEditor_member = await addEntity('editorMember',editor_member);
        if(newEditor_member){
            await datasStore.initializeDatasStore(datas);
            navigate('/home');
        }else{
            setError("❌ Une erreur est intervenue.");
        }
    }
    return (
    <>
     <H2 title="Créer des membres"/>
     <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
                }
            }
            >
            <H2 title="Nouvel membre"/>
            <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                <Input label={"Id éditeur"} idName={"editor_id"} type={"number"} state={editor_id} setState={setEditor_id} />
                <Input label={"Id Utilisateur"} idName={"user_id"} type={"number"} state={user_id} setState={setUser_id} />
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