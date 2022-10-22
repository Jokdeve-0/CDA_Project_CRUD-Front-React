import React from 'react';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';



export function EditorTable({editor}) {
    return (<>
    <H2 title="Les détails d'un éditeur"/>
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Cell>Nom</Table.Cell>
                    <Table.Cell>ISBN Produit</Table.Cell>
                    <Table.Cell>ISBN Pays</Table.Cell>
                    <Table.Cell>ISBN Éditeur</Table.Cell>
                    <Table.Cell>Créé le</Table.Cell>
                    <Table.Cell>Modifié le</Table.Cell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {editor &&  (
                    <Table.Row key={`${editor.id}${editor.name}`}>
                    <Table.Cell>{editor.name}</Table.Cell>
                    <Table.Cell>{editor.isbn_product}</Table.Cell>
                    <Table.Cell>{editor.isbn_country}</Table.Cell>
                    <Table.Cell>{editor.isbn_editor}</Table.Cell>
                    <Table.Cell>{formatDate(editor.created_at)}</Table.Cell>
                    <Table.Cell>{editor.updated_at
                        ? formatDate(editor.updated_at)
                        : 'Jamais modifié'
                    }</Table.Cell>
                </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>
    );
}