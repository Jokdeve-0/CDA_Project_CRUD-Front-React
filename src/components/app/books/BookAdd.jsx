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
import validations from 'src/resources/Validation';
import { MessageError } from '../errors/Errors';
import { MessageEmpty } from '../errors/Empty';

export function BookAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();

    const [uuid,setUuid] = useState(124578);
    const [isbn_article,setIsbn_article] = useState(123);
    const [title,setTitle] = useState("titreTest");
    const [authors,setAuthors] = useState("Jokdeve");
    const [metadata,setMetadata] = useState(JSON.stringify({"pages":120}));
    const [nav,setNav] = useState(JSON.stringify({"chapitres":20}));
    const [editor_id,setEditor_id] = useState(1);

    const [error ,setError] = useState();
    const [errorUuid ,setErrorUuid] = useState();
    const [errorIsbn_article ,setErrorIsbn_article] = useState();
    const [errorTitle ,setErrorTitle] = useState();
    const [errorAuthors ,setErrorAuthors] = useState();
    const [errorMetadata ,setErrorMetadata] = useState();
    const [errorNav ,setErrorNav] = useState();
    const [errorEditor_id ,setErrorEditor_id] = useState();

    const initErrors = () => {
        setError();
        setErrorUuid();
        setErrorIsbn_article();
        setErrorTitle();
        setErrorAuthors();   
        setErrorMetadata();   
        setErrorNav();   
        setErrorEditor_id();   
    }

    const setErrors = (valid) => {
        setErrorUuid(valid.uuid);
        setErrorIsbn_article(valid.isbn_article);
        setErrorTitle(valid.title);
        setErrorAuthors(valid.authors);   
        setErrorMetadata(valid.metadata);   
        setErrorNav(valid.nav);   
        setErrorEditor_id(valid.editor_id);  
        setTimeout(()=>{
            initErrors();
        },5000)
    }

    const handleSubmit = async () => {
      const entity = new BaseBook(
        {
          uuid:uuid,
          isbn_article:isbn_article, 
          title:title,
          authors:authors,
          metadata:metadata,
          nav:nav,
          editor_id:editor_id
        });
      const valid = validations.checkers(entity,[
        'uuid',
        'isbn_article', 
        'title',
        'authors',
        'metadata',
        'nav',
        'editor_id'
    ]);
      let isValid = true;
      for( const val in valid ){if(valid[val]){isValid = false;}}
      if(isValid){
        try{
          const newBook = await addEntity('book',entity);
          if(newBook.status === 201){
              await datasStore.initializeDatasStore(datas);
              navigate('/home');
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
                  {error && <MessageError error={error} />}

                <hr/>
                {errorTitle && <MessageError error={errorTitle} />}
                <Input label={"Titre de l'ouvrage"} idName={"title"} type={"text"} state={title} setState={setTitle} />

                <hr className='my-4'/>
                {errorUuid && <MessageError error={errorUuid} />}
                <Input label={"Uuid"} idName={"uuid"} type={"number"} state={uuid} setState={setUuid} />
                <MessageEmpty message={'*Dans un contexte normal, il est implémenté automatiquement. (entre 1 et 7 chiffres)'} />

                <hr className='my-4'/>
                {errorIsbn_article && <MessageError error={errorIsbn_article} />}
                <Input label={"Isbn Article"} idName={"isbn_article"} type={"number"} state={isbn_article} setState={setIsbn_article} />
                <MessageEmpty message={'*Dans un contexte normal, il est implémenté automatiquement. (minimum 7 chiffres)'} />

                <hr className='my-4'/>
                {errorAuthors && <MessageError error={errorAuthors} />}
                <Input label={"Auteurs"} idName={"authors"} type={"text"} state={authors} setState={setAuthors} />
                <MessageEmpty message={'*les noms des auteurs séparés par une virgule.'} />

                <hr className='my-4'/>
                {errorMetadata && <MessageError error={errorMetadata} />}
                <Input label={"Metadata"} idName={"metadata"} type={"text"} state={metadata} setState={setMetadata} />
                <MessageEmpty message={'*Dans un contexte normal, "METADATA" se composé de plusieurs champs qui l\'implémenteront sous forme d\'objet.'} />
                
                <hr className='my-4'/>
                {errorNav && <MessageError error={errorNav} />}
                <Input label={"Navigation"} idName={"nav"} type={"text"} state={nav} setState={setNav} />
                <MessageEmpty message={'*Dans un contexte normal, "NAV" se composé de plusieurs champs qui l\'implémenteront sous forme d\'objet.'} />
                
                <hr className='my-4'/>
                {errorEditor_id && <MessageError error={errorEditor_id} />}
                <Input label={"Id éditor"} idName={"editor_id"} type={"text"} state={editor_id} setState={setEditor_id} />
                <MessageEmpty message={'*L\'id éditeur doit appartenir à un editeur existant. Dans un contexte normal, il est implémenté automatiquement par l\'éditeur qui créé l\'ouvrage.'} />
                
                <hr className='my-4'/>
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