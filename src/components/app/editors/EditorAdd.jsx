import React, {useState, useContext } from 'react';
import { DatasContext } from '../../../application';
import { addEntity } from '../../../store/requests';
import { useNavigate } from "react-router-dom";
import { Input } from '../../base/Input/Input';
import { H2 } from '../../base/Title/H2';
import { datasStore } from '../../../store/resources/DatasStore';
import { BaseEditor } from '../../../models/Editor';
import { Button } from '../../base/Button/Button';
import cssStandard from '../../styles/base.module.scss';


export function EditorAdd() {
    const datas = useContext(DatasContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [name, setName] = useState("Publisher");
    const [isbn_product, setProduct] = useState(987);
    const [isbn_country, setCountry] = useState(103);
    const [isbn_editor, setIsbn_editor] = useState(22);
    const handleSubmit = async () => {
        const editor = new BaseEditor({name,isbn_product,isbn_country,isbn_editor});
        const newEditor = await addEntity('editor',editor);
        if(newEditor){
            await datasStore.getAllDatas();
            datasStore.updateDatasStore(datas);
            navigate('/home');
        }else{
            setError("❌ Une erreur est intervenue.");
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
                <p className={cssStandard.messageError}>{error}</p>
                <Input label={"Nom d'éditeur"} idName={"name"} type={"text"} state={name} setState={setName} />
                <Input label={"Code Produit"} idName={"isbn_product"} type={"number"} state={isbn_product} setState={setProduct} />
                <Input label={"Code Pays"} idName={"isbn_country"} type={"number"} state={isbn_country} setState={setCountry} />
                <Input label={"Code Éditeur"} idName={"isbn_editor"} type={"number"} state={isbn_editor} setState={setIsbn_editor} />
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