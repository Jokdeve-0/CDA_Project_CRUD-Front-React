import React from 'react';
import { NavLink } from 'react-router-dom';
import { DatasContext } from '../../../application';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';
import { MessageEmpty } from '../errors/Empty';
import { Spinner } from 'src/components/base/Spinner/Spinner';
import { Animation } from 'src/components/base/animation/Animation';
export function RolesTable({isInitDatas}) {
    const datas = React.useContext(DatasContext);
    const [roles] = datas.roles !== null ? datas.roles : [] ;
    return (
    <>
        <H2 title="La table des rôles"/>
        {isInitDatas 
            ?roles && roles.length > 0
                ? (<Animation><Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Nom</Table.Cell>
                            <Table.Cell>Créé le</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {roles && roles.map(role => (
                        <Table.Row key={`${role.id}${role.name}`}>
                            <Table.Cell>
                                <NavLink to={`/role&id=${role.id}`}>{role.name}</NavLink>
                            </Table.Cell>
                            <Table.Cell>{formatDate(role.created_at)}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table></Animation>)
                : <MessageEmpty message={'Il n\'y a aucune donnée dans la table des rôles .'}/>
            : <Spinner />
        }        
    </> 
    ); 
}