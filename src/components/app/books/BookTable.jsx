import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';

export function BookTable({book}) {
    return (<>
        <H2 title="Les détails d'un utilisateur"/>
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Cell>Titre</Table.Cell>
                    <Table.Cell>Créé le</Table.Cell>
                    <Table.Cell>Modifié le</Table.Cell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {book &&  (
                    <Table.Row key={`${book.id}${book.title}`}>
                        <Table.Cell>
                        <NavLink to={`/book&id=${book.id}`}>{book.title}</NavLink>
                        </Table.Cell>
                        <Table.Cell>{formatDate(book.created_at)}</Table.Cell>
                        <Table.Cell>{book.updated_at
                        ?formatDate(book.updated_at)
                        : 'Jamais modifié'}
                    </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>
    );
}