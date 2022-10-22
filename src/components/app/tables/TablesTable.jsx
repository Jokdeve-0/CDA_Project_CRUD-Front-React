import React from 'react';
import { DatasContext } from '../../../application';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';

import cssStandard from '../../styles/base.module.scss';
export function TablesTable() {
    const datas = React.useContext(DatasContext);
    const [tables] = datas.tables !== null ? datas.tables : [] ;
    return (
    <>
        <H2 title="La table des tables"/>
        {tables && tables.length > 0
            ? (<Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Cell>Tables</Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {tables && tables.map(table => (
                    <Table.Row key={`${table.Tables_in_moovleendb}${Math.random()}`}>
                        <Table.Cell>{table.Tables_in_moovleendb}</Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>)
        : <p className={cssStandard.messageError}>Il n'y a aucune table existante.</p>
        }
    </> 
    ); 
}