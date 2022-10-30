import React from 'react';
import { NavLink } from 'react-router-dom';
import { DatasContext } from '../../../application';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';
import cssStandard from '../../styles/base.module.scss';
import { MessageEmpty } from '../errors/Empty';
export function MembersTable() {
    const datas = React.useContext(DatasContext);
    const [editorMembers] = datas.editorMembers !== null ? datas.editorMembers : [] ;
    return (
    <>
        <H2 title="La table des membres"/>
        {editorMembers && editorMembers.length > 0
        ? (<Table>
            <Table.Head>
                <Table.Row>
                    <Table.Cell>ID Utilisateur</Table.Cell>
                    <Table.Cell>ID Éditeur</Table.Cell>
                    <Table.Cell>Créé le</Table.Cell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {editorMembers && editorMembers.map(editorMember => (
                <Table.Row key={`${editorMember.id}${editorMember.user_id}`}>
                    <Table.Cell>
                        <NavLink to={`/member&id=${editorMember.id}`}>{editorMember.user_id}</NavLink>
                    </Table.Cell>
                    <Table.Cell>{editorMember.editor_id}</Table.Cell>
                    <Table.Cell>{formatDate(editorMember.created_at)}</Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
        </Table>)
        : <MessageEmpty message={'Il n\'y a aucune donnée dans la table des membres.'} />}
    </> 
    ); 
}