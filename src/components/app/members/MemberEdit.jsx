import React, { useState, useContext, useEffect } from 'react';
import { DatasContext } from '../../../application';
import { deleteEntity, editEntity, selectEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {EditorMember}  from '../../../models/EditorMember'
import { datasStore } from '../../../store/resources/DatasStore';
import { DateTime } from 'luxon';
import { Button } from '../../base/Button/Button';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';


export function MemberEdit({setEditor_memberTable}) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [editor_member,setEditor_member] = useState();
    const [loadingMember,setLoadingMember] = useState(false);
    const [editor_id, setEditor_id] = useState("");
        const [user_id, setUser_id] = useState("");
    useEffect(()=>{
        const getEditor_member= async (editor_memberId)=>{
            const results = await (await selectEntity('editorMember',{id:editor_memberId})).data.results;
            setEditor_member(results[0]);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getEditor_member(id);
            setLoadingId(true);
        }
        if(editor_member && !loadingMember){
            setEditor_id(editor_member.editor_id);
            setUser_id(editor_member.user_id);
            setLoadingMember(true);
        }

    },[id, editor_member, editor_id, user_id, loadingId, loadingMember, params]);
  
        const datas = useContext(DatasContext);
        const navigate = useNavigate();
        const [error, setError] = useState("");
 
    const handleSubmit = async () => {
        const editor_memberEdited = new EditorMember({id:editor_member.id,editor_id:editor_id,user_id: user_id,created_at:editor_member.created_at,updated_at: DateTime.local({locale:"fr"}).toISO()});
        try{
            const newEditor_memberEdited = await editEntity('editorMember',editor_memberEdited);
            if(newEditor_memberEdited.status === 200){
                await datasStore.initializeDatasStore(datas);
                setEditor_memberTable(editor_memberEdited);
            }else{
                setError("❌ Une erreur est intervenue.");
            }
        }catch(e){
            setError("❌ Une erreur est intervenue.");
        }
    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('editorMember',id);
        if(isDeleted){
            await datasStore.initializeDatasStore(datas);
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
                <H2 title="Modifier un membre"/>  
                <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                    <Input label={"Id Éditeur"} idName={"editor_id"} type={"number"} state={editor_id} setState={setEditor_id} />
                    <Input label={"Id Utilisateur"} idName={"user_id"} type={"number"} state={user_id} setState={setUser_id} />
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
                >Supprimer le membre</Button>
            </div>
        </div>

    </> 
    ); 
}