import React from 'react';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';



export function MemberTable({editor_member}) {
    return (<>
        <H2 title="Les détails d'un membre"/>
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Cell>ID Utilisateur</Table.Cell>
                    <Table.Cell>Id Éditeur</Table.Cell>
                    <Table.Cell>Créé le</Table.Cell>
                    <Table.Cell>Modifié le</Table.Cell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {editor_member &&  (
                <Table.Row key={`${editor_member.id}${editor_member.user_id}`}>
                    <Table.Cell>{editor_member.editor_id}</Table.Cell>
                    <Table.Cell>{editor_member.user_id}</Table.Cell>
                    <Table.Cell>{formatDate(editor_member.created_at)}</Table.Cell>
                    <Table.Cell>{editor_member.updated_at
                        ?formatDate(editor_member.updated_at)
                        : 'Jamais modifié'}
                    </Table.Cell>
                </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>
    );
}