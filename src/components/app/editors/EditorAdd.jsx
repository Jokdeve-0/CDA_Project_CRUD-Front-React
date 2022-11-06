import React, {useState, useContext } from 'react';
import { DatasContext } from 'src/application';
import { addEntity } from 'src/store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from 'src/components/base/Input/Input';
import { H2 } from 'src/components/base/Title/H2';
import { datasStore } from 'src/store/resources/DatasStore';
import { BaseEditor } from 'src/models/Editor';
import { Button } from 'src/components/base/Button/Button';
import cssStandard from 'src/components/styles/base.module.scss';
import { MessageError } from 'src/components/app/errors/Errors';
import validations from 'src/resources/Validation';


export function EditorAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [name, setName] = useState();
    const [isbn_product, setProduct] = useState();
    const [isbn_country, setCountry] = useState();
    const [isbn_editor, setIsbn_editor] = useState();

    const [errorName, setErrorName] = useState();
    const [errorIsbn_product, setErrorIsbn_product] = useState();
    const [errorIsbn_country, setErrorIsbn_country] = useState();
    const [errorIsbn_editor, setErrorIsbn_editor] = useState();


    const initErrors = () => {
        setError();
        setErrorName();
        setErrorIsbn_product();
        setErrorIsbn_country();
        setErrorIsbn_editor();   
    }
    const setErrors = (valid) => {
        setErrorName(valid.name);
        setErrorIsbn_product(valid.isbn_product);
        setErrorIsbn_country(valid.isbn_country);
        setErrorIsbn_editor(valid.isbn_editor);   
        setTimeout(()=>{
            initErrors();
        },5000)
    }

    const handleSubmit = async () => {
        initErrors();
        const entity = new BaseEditor(
            {
                name,
                isbn_product,
                isbn_country,
                isbn_editor
            }
        );
        const valid = validations.checkers(entity,['name','isbn_product','isbn_country','isbn_editor']);
        let isValid = true;
        for( const val in valid ){if(valid[val]){isValid = false;}}
        if(isValid){
            try{
                const newEditror = await addEntity('editor',entity);
                if(newEditror.status === 201){
                    await datasStore.initializeDatasStore(datas);
                    navigate('/home');
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
            }
            setTimeout(()=>{
                initErrors();
            },5000) 
        }else{
            setErrors(valid);
        }
    }
    return (
    <>
    <H2 title="Créer des éditeurs"/>
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
                    >Créer</Button>
                </div>
            </div>
            </form>
        </div>
    </> 
    ); 
}