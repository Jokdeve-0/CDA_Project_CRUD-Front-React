import React, {useState,useEffect } from 'react';
import { EditorEdit } from '../../components/app/editors/EditorEdit';
import { EditorTable } from '../../components/app/editors/EditorTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function EditorDetailsPage() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [editor,setEditor] = useState();
    const [loadingEditor,setLoadingEditor] = useState(false);
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
            setLoadingEditor(true);
        }
    },[id, loadingId, loadingEditor, params, editor]);

    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                 <EditorTable editor={editor} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <EditorEdit setEditorTable={setEditor} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}