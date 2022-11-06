/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect } from 'react';
import { EditorMembersUser } from 'src/components/app/members/EditorMembersUser';
import { EditorEdit } from '../../components/app/editors/EditorEdit';
import { EditorTable } from '../../components/app/editors/EditorTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function EditorDetailsPage() {
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [editor,setEditor] = useState();
    const [users,setUsers] = useState();
    const [loadingEditor,setLoadingEditor] = useState(false);
    useEffect(()=>{
        const getEditor= async (editorId)=>{
            const results = await (await selectEntity('editor',{id:editorId})).data.results;
            setEditor(results['results'][0]);
            setUsers(results['relationResults']);
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
                    <EditorEdit editor={editor} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                 <EditorTable editor={editor} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                  <EditorMembersUser users={users} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}