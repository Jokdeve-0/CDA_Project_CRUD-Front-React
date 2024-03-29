import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../../../resources/formatDate';
import { Table } from '../../base/Table/Table';
import { H2 } from '../../base/Title/H2';
import { MessageEmpty } from '../errors/Empty';
import { Animation } from 'src/components/base/animation/Animation';

export function EditorMembersUser({users}) {
    return (
      <>
        <H2 title="La table de ses utilisateurs"/>
        {users && users.length > 0
          ? (<Animation><Table>
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
                  {users && users.map(user => (
                      <Table.Row key={`${user.id}${user.username}`}>
                          <Table.Cell>
                              <NavLink to={`/user&id=${user.id}`}>{user.username}</NavLink>
                          </Table.Cell>
                          <Table.Cell>
                              {user.mail}
                              <p className='text-xs'>Mot de passe crypté : {user.password}</p>
                          </Table.Cell>
                          <Table.Cell>{user.role_id}</Table.Cell>
                          <Table.Cell>{formatDate(user.created_at)}</Table.Cell>
                          <Table.Cell>
                              {user.updated_at
                              ? formatDate(user.updated_at) 
                              : 'Jamais modifié'}
                          </Table.Cell>
                      </Table.Row>
                  ))}
              </Table.Body>
          </Table></Animation>)
          : <MessageEmpty message={'Il n\'y a aucune donnée dans la table des utilisateurs.'} />
        }
      </>
    ); 
}