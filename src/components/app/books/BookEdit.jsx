/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { DatasContext } from '../../../application';
import { deleteEntity, editEntity, selectEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {Book}  from '../../../models/Book'
import { datasStore } from '../../../store/resources/DatasStore';
import { DateTime } from 'luxon';
import { Button } from '../../base/Button/Button';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';
import { MessageError } from '../errors/Errors';
import validations from 'src/resources/Validation';
import { MessageSuccess } from '../errors/Success';


export function BookEdit({setBookTable}) {
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [book,setBook] = useState("");
    const [loadingBook,setLoadingBook] = useState(false);
    const [uuid,setUuid] = useState("");
    const [isbn_article,setIsbn_article] = useState("");
    const [title,setTitle] = useState("");
    const [authors,setAuthors] = useState("");
    const [metadata,setMetadata] = useState("");
    const [nav,setNav] = useState("");
    const [editor_id,setEditor_id] = useState("");
    const datas = useContext(DatasContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const getBook= async (bookId)=>{
            const infos = await (await selectEntity('book',{id:bookId})).data.infos;
            setBook(infos[0]);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getBook(id);
            setLoadingId(true);
        }
        if(book && !loadingBook){
            setUuid(book.uuid);
            setIsbn_article(book.isbn_article);
            setTitle(book.title);
            setAuthors(book.authors);
            setMetadata(book.metadata);
            setNav(book.nav);
            setEditor_id(book.editor_id);
            setLoadingBook(true);
        }

    },[id, book, loadingId, loadingBook, params]);
  
    const [error ,setError] = useState();
    const [errorTitle ,setErrorTitle] = useState();
    const [errorAuthors ,setErrorAuthors] = useState();
    const [errorMetadata ,setErrorMetadata] = useState();
    const [errorNav ,setErrorNav] = useState();
    const [success, setSuccess] = useState();

    const initErrors = () => {
        setError();
        setErrorTitle();
        setErrorAuthors();   
        setErrorMetadata();   
        setErrorNav(); 
        setSuccess();  
    }

    const setErrors = (valid) => {
        setErrorTitle(valid.title);
        setErrorAuthors(valid.authors);   
        setErrorMetadata(valid.metadata);   
        setErrorNav(valid.nav);   
        setTimeout(()=>{
            initErrors();
        },5000)
    }
 
    const handleSubmit = async () => {
        const entity = new Book(
            {
                id:book.id,
                uuid:uuid,
                isbn_article:isbn_article, 
                title:title,
                authors:authors,
                metadata:metadata ,nav:nav,
                editor_id:editor_id,
                created_at:book.created_at,
                updated_at: DateTime.local({locale:"fr"}).toISO()
            }
        );
        const valid = validations.checkers(entity,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        let isValid = true;
        for( const val in valid ){if(valid[val]){isValid = false;}}
        if(isValid){
            try{
                const newBookEdited = await editEntity('book',entity);
                if(newBookEdited.status === 201){
                    await datasStore.initializeDatasStore(datas);
                    setBookTable(entity);
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
                setError(validations.messages.server);
                setTimeout(()=>{
                    initErrors();
                },5000)
            }
        }else{
            setErrors(valid);
        }
    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('book',id);
        if(isDeleted.status === 201){
            await datasStore.initializeDatasStore(datas);
            navigate('/home');
        }else{
            setError(validations.messages.server);
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
                <H2 title="Modifier un ouvrage"/>  
                <div className={cssStandard.formContent}>
                {success && <MessageSuccess id="success" success={success} />}
                  {error && <MessageError error={error} />}

                <hr/>
                {errorTitle && <MessageError error={errorTitle} />}
                <Input label={"Titre de l'ouvrage"} idName={"title"} type={"text"} state={title} setState={setTitle} />

                <hr className='my-4'/>
                {errorAuthors && <MessageError error={errorAuthors} />}
                <Input label={"Auteurs"} idName={"authors"} type={"text"} state={authors} setState={setAuthors} />

                <hr className='my-4'/>
                {errorMetadata && <MessageError error={errorMetadata} />}
                <Input label={"Metadata"} idName={"metadata"} type={"text"} state={metadata} setState={setMetadata} />
                
                <hr className='my-4'/>
                {errorNav && <MessageError error={errorNav} />}
                <Input label={"Navigation"} idName={"nav"} type={"text"} state={nav} setState={setNav} />
                
                <hr className='my-4'/>
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
                >Supprimer l'ouvrage</Button>
            </div>
        </div>

    </> 
    ); 
}