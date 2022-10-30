import React from 'react';
import { DropdownApp } from 'src/components/base/Dropdown/DropdownApp';
import { H1 } from 'src/components/base/Title/H1';
import { DropAddEntity } from '../../base/Dropdown/DropAddEntity';
import { DropDatabase } from '../../base/Dropdown/DropDatabase';
import { Nav } from '../../base/Nav/Nav';

export function Header({children}) {
    return (
        <header>
            <H1 title="PROJET BONUS CDA" />
            <Nav>
                <DropdownApp />
                <DropDatabase />
                <DropAddEntity />
            </Nav>
        </header>
    );
  }