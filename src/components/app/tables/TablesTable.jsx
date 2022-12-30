import React from 'react';
import { DatasContext } from '../../../application';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';

import { Spinner } from 'src/components/base/Spinner/Spinner';
import { MessageEmpty } from '../errors/Empty';
import { Animation } from 'src/components/base/animation/Animation';
export function TablesTable({ isInitDatas }) {
    const datas = React.useContext(DatasContext);
    const [tables] = datas.tables !== null ? datas.tables : [];

    return (
        <>
            <H2 title="La table des tables" />
            {isInitDatas
                ? tables && tables.length > 0
                    ? (<Animation ><Table className='bg-red-900'>
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell>Tables</Table.Cell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {tables && tables.map(table => (
                                <Table.Row key={`${table.Tables_in_addictocode_api}${Math.random()}`}>
                                    <Table.Cell>{table.Tables_in_addictocode_api}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table></Animation>)

                    : <MessageEmpty message={'Il n\'y a aucune table existante.'} />
                : <Spinner />
            }
        </>
    );
}