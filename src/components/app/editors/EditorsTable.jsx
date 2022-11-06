import React from 'react';
import { NavLink } from 'react-router-dom';
import { DatasContext } from '../../../application';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';
import { MessageEmpty } from '../errors/Empty';
import { Spinner } from 'src/components/base/Spinner/Spinner';
import { Animation } from 'src/components/base/animation/Animation';

export function EditorsTable({isInitDatas}) {
    const datas = React.useContext(DatasContext);
    const [editors] = datas.editors !== null ? datas.editors : [] ;
    return (
    <>
    <H2 title="La table des editeurs"/>
            {isInitDatas 
                ? editors && editors.length > 0
                    ? (<Animation><Table>
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
                            {editors && editors.map(editor => (
                            <Table.Row key={`${editor.id}${editor.name}`}>
                                <Table.Cell><NavLink to={`/editor&id=${editor.id}`}>{editor.name}</NavLink></Table.Cell>
                                <Table.Cell>{editor.isbn_product}</Table.Cell>
                                <Table.Cell>{editor.isbn_country}</Table.Cell>
                                <Table.Cell>{editor.isbn_editor}</Table.Cell>
                                <Table.Cell>{formatDate(editor.created_at)}</Table.Cell>
                                <Table.Cell>{editor.updated_at
                                    ? formatDate(editor.updated_at)
                                    : 'Jamais modifié'
                                }</Table.Cell>
                            </Table.Row>
                            ))}
                        </Table.Body>
                    </Table></Animation>)
                : <MessageEmpty message={'Il n\'y a aucune donnée dans la table des éditeurs.'} />
            : <Spinner />
        }
    </> 
    ); 
}