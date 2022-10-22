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


export function BookEdit({setBookTable}) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [book,setBook] = useState();
    const [loadingBook,setLoadingBook] = useState(false);
    const [uuid,setUuid] = useState();
    const [isbn_article,setIsbn_article] = useState();
    const [title,setTitle] = useState();
    const [authors,setAuthors] = useState();
    const [metadata,setMetadata] = useState();
    const [nav,setNav] = useState();
    const [editor_id,setEditor_id] = useState();

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
  
        const datas = useContext(DatasContext);
        const navigate = useNavigate();
        const [error, setError] = useState("");
 
    const handleSubmit = async () => {
        const bookEdited = new Book({id:book.id,uuid:uuid ,isbn_article:isbn_article, title:title ,authors:authors ,metadata:metadata ,nav:nav ,editor_id:editor_id ,created_at:book.created_at,updated_at: DateTime.local({locale:"fr"}).toISO()});
        try{
            const newBookEdited = await editEntity('book',bookEdited);
            if(newBookEdited.status === 202){
                await datasStore.getAllDatas();
                datasStore.updateDatasStore(datas);
                setBookTable(bookEdited);
            }else{
                setError("❌ Une erreur est intervenue.");
            }
        }catch(e){
            setError("❌ Une erreur est intervenue.");
        }
    }

    const handleClick= async () => {
        const isDeleted = await deleteEntity('book',id);
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
        <div className={cssStandard.formBox}>
            <form
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
            }}>
                <H2 title="Modifier un ouvrage"/>  
                <div className={cssStandard.formContent}>
                <p className={cssStandard.messageError}>{error}</p>
                    <Input label={"Titre de l'ouvrage"} idName={"title"} type={"text"} state={title} setState={setTitle} />
                    <Input label={"Uuid"} idName={"uuid"} type={"number"} state={uuid} setState={setUuid} />
                    <Input label={"Isbn Article"} idName={"isbn_article"} type={"number"} state={isbn_article} setState={setIsbn_article} />
                    <Input label={"Auteurs"} idName={"authors"} type={"text"} state={authors} setState={setAuthors} />
                    <Input label={"Metadata"} idName={"metadata"} type={"text"} state={metadata} setState={setMetadata} />
                    <Input label={"Navigation"} idName={"nav"} type={"text"} state={nav} setState={setNav} />
                    <Input label={"Id éditor"} idName={"editor_id"} type={"text"} state={editor_id} setState={setEditor_id} />
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