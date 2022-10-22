import React, {useState,useEffect } from 'react';
import { MemberEdit } from '../../components/app/members/MemberEdit';
import { MemberTable } from '../../components/app/members/MemberTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function MemberDetailsPage() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [editor_member,setEditor_member] = useState();
    const [loadingEditor_member,setLoadingEditor_member] = useState(false);
    useEffect(()=>{
        const getEditor_member= async (editor_memberId)=>{
            const infos = await (await selectEntity('editorMember',{id:editor_memberId})).data.infos;
            setEditor_member(infos[0]);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getEditor_member(id);
            setLoadingId(true);
        }
        if(editor_member && !loadingEditor_member){
            setLoadingEditor_member(true);
        }
    },[id, loadingId, loadingEditor_member, params, editor_member]);

    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                 <MemberTable editor_member={editor_member} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <MemberEdit setEditor_memberTable={setEditor_member} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}