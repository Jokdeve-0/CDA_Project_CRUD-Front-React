import React, { useState, useContext, useEffect } from 'react';
import { DatasContext } from '../../../application';
import { deleteEntity, editEntity, selectEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import { datasStore } from '../../../store/resources/DatasStore';
import { DateTime } from 'luxon';
import { Button } from '../../base/Button/Button';
import { Editor } from '../../../models/Editor';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';


export function EditorEdit({setEditorTable}) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [editor,setEditor] = useState();
    const [loadingEditor,setLoadingEditor] = useState(false);

    const [name, setName] = useState();
    const [isbn_product, setProduct] = useState();
    const [isbn_country, setCountry] = useState();
    const [isbn_editor, setIsbn_editor] = useState();


    useEffect(()=>{
        const getEditor= async (editorId)=>{
            const infos = await (await selectEntity('editor',{id:editorId})).data.infos;
            setEditor(infos[0]);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getEditor(id);
            setLoadingId(true);
        }
        if(editor && !loadingEditor){
            setName( editor.name);
            setProduct(editor.isbn_product);
            setCountry(editor.isbn_country);
            setIsbn_editor(editor.isbn_editor);
            setLoadingEditor(true);
        }

    },[id, editor, loadingId, loadingEditor, params]);
  
        const datas = useContext(DatasContext);
        const navigate = useNavigate();
        const [error, setError] = useState("");
 
    const handleSubmit = async () => {
        const editorEdited = new Editor({
            id:editor.id,
            name:name,
            isbn_product:isbn_product,
            isbn_country:isbn_country,
            isbn_editor:isbn_editor,
            created_at:editor.created_at,
            updated_at: DateTime.local({locale:"fr"}).toISO()
        })
        try{
            const newEditorEdited = await editEntity('editor',editorEdited);
            if(newEditorEdited.status === 202){
                await datasStore.getAllDatas();
                datasStore.updateDatasStore(datas);
                setEditorTable(editorEdited);
            }else{
                setError("❌ Une erreur est intervenue.");
            }
        }catch(e){
            setError("❌ Une erreur est intervenue.");
        }
    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('editor',id);
        console.log(isDeleted)
        if(isDeleted){
            await datasStore.getAllDatas();
            datasStore.updateDatasStore(datas);
            navigate('/home');
        }else{
            setError("❌ Une erreur est intervenue.");
        }
    }
    return (
    <>   
        <H2 title="Modifier un éditeur"/>
        <div className={cssStandard.formBox}>
            <form
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
            }}>
                <H2 title="Modifier un éditeur"/>  
                <div className={cssStandard.formContent}>
                    <p className={cssStandard.messageError}>{error}</p>
                    <Input label={"Nom d'éditeur"} idName={"name"} type={"text"} state={name} setState={setName} />
                    <Input label={"Code Produit"} idName={"isbn_product"} type={"number"} state={isbn_product} setState={setProduct} />
                    <Input label={"Code Pays"} idName={"isbn_country"} type={"number"} state={isbn_country} setState={setCountry} />
                    <Input label={"Code Éditeur"} idName={"isbn_editor"} type={"number"} state={isbn_editor} setState={setIsbn_editor} />
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
                >Supprimer l'éditeur</Button>
            </div>
        </div>
    </> 
    ); 
}