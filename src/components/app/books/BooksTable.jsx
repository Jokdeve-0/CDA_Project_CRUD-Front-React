import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DatasContext } from '../../../application';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';
import { MessageEmpty } from '../errors/Empty';
import { Spinner } from 'src/components/base/Spinner/Spinner';
import { Animation } from 'src/components/base/animation/Animation';
export function BooksTable({isInitDatas}) {
    const datas = useContext(DatasContext);
    const [books] = datas.books !== null ? datas.books : [] ;
    return (
    <>
        <H2 title="La table des ouvrages"/>
        {isInitDatas 
            ? books && books.length > 0
                ? (<Animation><Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Titre</Table.Cell>
                            <Table.Cell>Créé le</Table.Cell>
                            <Table.Cell>Modifié le</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {books && books.map(book => (
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
                        ))}
                    </Table.Body>
                </Table></Animation>)
                : <MessageEmpty message={'Il n\'y a aucune donnée dans la table des ouvrages.'} />
            : <Spinner />
        }
    </> 
    ); 
}