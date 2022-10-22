import React from 'react';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';



export function UserTable({user}) {
    return (<>
        <H2 title="Les détails d'un utilisateur"/>
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Cell>Nom</Table.Cell>
                    <Table.Cell>Email</Table.Cell>
                    <Table.Cell>Role</Table.Cell>
                    <Table.Cell>Créé le</Table.Cell>
                    <Table.Cell>Modifié le</Table.Cell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {user &&  (
                <Table.Row key={`${user.id}${user.username}`}>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.mail}</Table.Cell>
                    <Table.Cell>{user.role_id}</Table.Cell>
                    <Table.Cell>{formatDate(user.created_at)}</Table.Cell>
                    <Table.Cell>{user.updated_at
                        ?formatDate(user.updated_at)
                        : 'Jamais modifié'}
                    </Table.Cell>
                </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>
    );
}