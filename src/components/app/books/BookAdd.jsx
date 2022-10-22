import React, {useState, useContext } from 'react';
import { DatasContext } from '../../../application';
import { addEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import {BaseBook}  from '../../../models/Book'
import { datasStore } from '../../../store/resources/DatasStore';
import { H2 } from '../../base/Title/H2';
import { Button } from '../../base/Button/Button'
import cssStandard from '../../styles/base.module.scss';


export function BookAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [uuid,setUuid] = useState(124578);
    const [isbn_article,setIsbn_article] = useState(123);
    const [title,setTitle] = useState("titreTest");
    const [authors,setAuthors] = useState("Jokdeve");
    const [metadata,setMetadata] = useState({meta:"data"});
    const [nav,setNav] = useState({nav:"link"});
    const [editor_id,setEditor_id] = useState(1);

    const handleSubmit = async () => {
        const book = new BaseBook({uuid:uuid ,isbn_article:isbn_article, title:title ,authors:authors ,metadata:metadata ,nav:nav ,editor_id:editor_id});// todo
        const newBook = await addEntity('book',book);
        if(newBook){
            await datasStore.getAllDatas();
            datasStore.updateDatasStore(datas);
            navigate('/home');
        }else{
            setError("❌ Une erreur est intervenue.");
        }
    }
    return (
    <>
     <H2 title="Créer des ouvrages"/>
        <div className={cssStandard.formBox}>
            <form  
            onSubmit={async (e)=>{
                e.preventDefault();
                await handleSubmit();
                }
            }
            >
            <H2 title="Nouvel ouvrage"/>
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
                    classname={cssStandard.formBtn}
                    >Créer</Button>
                </div>
            </div>
            </form>
        </div>
    </> 
    ); 
}