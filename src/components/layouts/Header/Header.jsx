import React, { useContext } from 'react';
import { DatasContext } from 'src/application';
import { DropdownApp } from 'src/components/base/Dropdown/DropdownApp';
import { H1 } from 'src/components/base/Title/H1';
import { DropAddEntity } from '../../base/Dropdown/DropAddEntity';
import { DropDatabase } from '../../base/Dropdown/DropDatabase';
import { Nav } from '../../base/Nav/Nav';

export function Header({children}) {
  const datas = useContext(DatasContext);
    return (
        <header>
            <H1 title="PROJET BONUS CDA" />
            <Nav>
                <DropdownApp />
                {!datas.isTokenValid[0] && <DropDatabase /> }
                {datas.isTokenValid[0] && <DropAddEntity /> } 
            </Nav>
        </header>
    );
  }