/* eslint-disable react-hooks/exhaustive-deps */
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
import { MessageSuccess } from '../errors/Success';
import { MessageError } from '../errors/Errors';
import validations from 'src/resources/Validation';


export function EditorEdit({editor}) {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [loadingEditor,setLoadingEditor] = useState(false);
    
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [errorName, setErrorName] = useState();
    const [errorIsbn_product, setErrorIsbn_product] = useState();
    const [errorIsbn_editor, setErrorIsbn_editor] = useState();
    const [errorIsbn_country, setErrorIsbn_country] = useState();

    const [name, setName] = useState("");
    const [isbn_product, setProduct] = useState("");
    const [isbn_country, setCountry] = useState("");
    const [isbn_editor, setIsbn_editor] = useState("");


    useEffect(()=>{
        const getEditor= async (editorId)=>{
            const results = await (await selectEntity('editor',{id:editorId})).data.results;
            if(results[0]){
              editor[1](results[0]);
            }
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
  
    const initErrors = () => {
        setError();
        setSuccess();
        setErrorName();
        setErrorIsbn_editor();
        setErrorIsbn_product();
        setErrorIsbn_country();
    }   

    const setErrors = (valid) => {
        setErrorName(valid.name);
        setErrorIsbn_product(valid.isbn_product); 
        setErrorIsbn_editor(valid.isbn_editor); 
        setErrorIsbn_country(valid.isbn_country);
        setTimeout(()=>{
            initErrors();
        },5000)
    }
 
    const handleSubmit = async () => {
        const entity = new Editor({
            id:editor.id,
            name:name,
            isbn_product:isbn_product,
            isbn_country:isbn_country,
            isbn_editor:isbn_editor,
            created_at:editor.created_at,
            updated_at: DateTime.local({locale:"fr"}).toISO()
        })
        const valid = validations.checkers(entity,['name','isbn_product','isbn_country','isbn_editor']);
        let isValid = true;
        for( const val in valid ){if(valid[val]){isValid = false;}}
        if(isValid){
            try{
                const newEditorEdited = await editEntity('editor',entity);
                if(newEditorEdited.status === 200){
                    await datasStore.initializeDatasStore(datas);
                    editor[1](entity);
                    setSuccess('Mise à jour !');
                    setTimeout(()=>{
                        initErrors();
                    },5000)
                }else{
                    setError(validations.messages.server);
                    setTimeout(()=>{
                        initErrors();
                    },5000)
                }
            }catch(e){
                if(e.response.data.error){
                    if(e.response.data.error.indexOf('editor.U_name') !== -1){
                        setErrorName(validations.messages.name);
                    }
                    else if(e.response.data.error.indexOf('editor.U_isbn_product') !== -1){
                        setErrorIsbn_product(validations.messages.isbn_product);
                    }
                    else if(e.response.data.error.indexOf('editor.U_isbn_editor') !== -1){
                        setErrorIsbn_product(validations.messages.isbn_editor);
                    }
                    else{setErrorIsbn_editor(validations.messages.isbn_country);}
                }
                setTimeout(()=>{
                    initErrors();
                },5000) 
            }
        }else{
            setErrors(valid);
        }

    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('editor',id);
        if(isDeleted.status === 200){
            await datasStore.initializeDatasStore(datas);
            navigate('/home');
        }else{
            setError(validations.messages.server);
        }
    }
    return ( 
    <div className={cssStandard.formBox}>
        <form
        onSubmit={async (e)=>{
            e.preventDefault();
            await handleSubmit();
        }}>
            <H2 title="Modifier un éditeur"/>  
            <div className={cssStandard.formContent}>
                {success && <MessageSuccess id="success" success={success} />}
                {error && <MessageError error={error} />}

                {errorName && <MessageError error={errorName} />}
                <Input label={"Nom d'éditeur"} idName={"name"} type={"text"} state={name} setState={setName} />

                {errorIsbn_product && <MessageError error={errorIsbn_product} />}
                <Input label={"Code Produit"} idName={"isbn_product"} type={"number"} state={isbn_product} setState={setProduct} />

                {errorIsbn_country && <MessageError error={errorIsbn_country} />}
                <Input label={"Code Pays"} idName={"isbn_country"} type={"number"} state={isbn_country} setState={setCountry} />

                {errorIsbn_editor && <MessageError error={errorIsbn_editor} />}
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
    ); 
}