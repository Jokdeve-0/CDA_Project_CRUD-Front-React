import React from 'react';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';

export function RoleTable({role}) {
    return (<>
        <H2 title="Les détails d'un rôle"/>
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Cell>Nom</Table.Cell>
                    <Table.Cell>Créé le</Table.Cell>
                    <Table.Cell>Modifié le</Table.Cell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {role &&  (
                <Table.Row key={`${role.id}${role.rolename}`}>
                    <Table.Cell>{role.name}</Table.Cell>
                    <Table.Cell>{formatDate(role.created_at)}</Table.Cell>
                    <Table.Cell>{role.updated_at
                        ?formatDate(role.updated_at)
                        : 'Jamais modifié'}
                    </Table.Cell>
                </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>
    );
}